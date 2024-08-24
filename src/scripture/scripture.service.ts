/**
 * Copyright (c) Christine Abernathy.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { bookMap } from './constants/book-map';
import { bibleVersionDisplayMap } from './constants/bible-version-display-map';
import {
  ScriptureResponse,
  Translation,
} from './interfaces/scripture.interface';
import { BibleVersion } from './enums/bible-version.enum';

@Injectable()
export class ScriptureService {
  private readonly logger = new Logger(ScriptureService.name);
  private readonly versesApiUrl = 'https://bolls.life/get-verses/';
  private readonly searchApiUrl = 'https://bolls.life/find/';
  private readonly bibleVersions: BibleVersion[] = [
    BibleVersion.NIV2011,
    BibleVersion.ESV,
    BibleVersion.NLT,
    BibleVersion.KJV,
  ];

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getScripture(
    book: string,
    chapter: number,
    startVerse: number,
    endVerse: number,
  ): Promise<ScriptureResponse> {
    const bookId = bookMap[book].id;
    if (!bookId) {
      throw new HttpException('Invalid book name', HttpStatus.BAD_REQUEST);
    }

    const verses = Array.from(
      { length: endVerse - startVerse + 1 },
      (_, i) => startVerse + i,
    );

    const requestBody = this.bibleVersions.map((translation) => ({
      translation,
      book: bookId,
      chapter,
      verses,
    }));

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.versesApiUrl, requestBody),
      );
      return this.formatResponse(book, chapter, startVerse, endVerse, data);
    } catch (error) {
      this.logger.error(
        `Failed to fetch scripture: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to fetch scripture',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private formatResponse(
    book: string,
    chapter: number,
    startVerse: number,
    endVerse: number,
    apiResponse: any[],
  ): ScriptureResponse {
    if (!Array.isArray(apiResponse)) {
      this.logger.error('Unexpected API response format', apiResponse);
      throw new HttpException(
        'Unexpected API response format',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const translations: Translation[] = this.bibleVersions.map((version) => {
      const translationData = apiResponse.find(
        (r) => r[0] && r[0].translation === version,
      );
      if (
        !translationData ||
        !Array.isArray(translationData) ||
        translationData.length === 0
      ) {
        this.logger.warn(`Missing or invalid translation data for ${version}`);
        return {
          name: bibleVersionDisplayMap[version],
          text: 'Translation not available',
        };
      }
      const text = this.processText(
        translationData.map((v) => v.text).join(' '),
      );
      return { name: bibleVersionDisplayMap[version], text };
    });
    return {
      passage: { book, chapter, startVerse, endVerse },
      translations,
    };
  }

  async searchScripture(
    version: BibleVersion,
    text: string,
  ): Promise<ScriptureResponse[]> {
    const apiVersion =
      version === BibleVersion.NIV ? BibleVersion.NIV2011 : version;
    const url = `${this.searchApiUrl}${apiVersion}/?search=${encodeURIComponent(text)}&match_case=false&match_whole=false`;

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      return this.formatSearchResponse(version, data);
    } catch (error) {
      this.logger.error(
        `Failed to search scripture: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to search scripture',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private formatSearchResponse(
    version: BibleVersion,
    apiResponse: any[],
  ): ScriptureResponse[] {
    if (!Array.isArray(apiResponse)) {
      this.logger.error('Unexpected API response format', apiResponse);
      throw new HttpException(
        'Unexpected API response format',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return apiResponse.map((item) => ({
      passage: {
        book: this.getBookName(item.book),
        chapter: item.chapter,
        startVerse: item.verse,
        endVerse: item.verse,
      },
      translations: [
        {
          name: bibleVersionDisplayMap[version],
          text: this.processText(item.text),
        },
      ],
    }));
  }

  private getBookName(bookId: number): string {
    const bookEntry = Object.entries(bookMap).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value.id === bookId,
    );
    return bookEntry ? bookEntry[0] : 'Unknown Book';
  }

  private processText(text: string): string {
    // First, remove text within <b> tags along with the tags themselves
    text = text.replace(/<b>.*?<\/b>/g, '');

    // Next, replace <br/> and <br> with newlines
    text = text.replace(/<br\s*\/?>/gi, '\n');

    // Then, remove Strong numbers
    text = text.replace(/<S>\d+<\/S>/g, '');

    // Then, remove any remaining HTML tags
    text = text.replace(/<\/?[^>]+(>|$)/g, ' ');

    // Finally, trim any leading or trailing whitespace
    return text.trim();
  }
}
