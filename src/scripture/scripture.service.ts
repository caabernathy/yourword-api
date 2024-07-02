import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { bookIdMap } from './constants/book-id-map';
import { ScriptureClass } from './models/scripture.class';
import { PassageClass } from './models/passage.class';
import { TranslationClass } from './models/translation.class';
import { BibleVersion } from './models/bible-version.enum';

@Injectable()
export class ScriptureService {
  private readonly logger = new Logger(ScriptureService.name);
  private readonly apiUrl = 'https://bolls.life/get-verses/';
  private readonly bibleVersions: BibleVersion[] = [
    BibleVersion.NIV,
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
  ): Promise<ScriptureClass> {
    const bookId = bookIdMap[book];
    if (!bookId) {
      throw new Error('Invalid book name');
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
        this.httpService.post(this.apiUrl, requestBody),
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
  ): ScriptureClass {
    if (!Array.isArray(apiResponse)) {
      this.logger.error('Unexpected API response format', apiResponse);
      throw new HttpException(
        'Unexpected API response format',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const translations: TranslationClass[] = this.bibleVersions.map(
      (version) => {
        const translationData = apiResponse.find(
          (r) => r[0] && r[0].translation === version,
        );
        if (
          !translationData ||
          !Array.isArray(translationData) ||
          translationData.length === 0
        ) {
          this.logger.warn(
            `Missing or invalid translation data for ${version}`,
          );
          return { name: version, text: 'Translation not available' };
        }
        const text = this.stripHtmlTags(
          translationData.map((v) => v.text).join(' '),
        );
        const translation = new TranslationClass(version, text);
        return translation;
      },
    );
    const passage = new PassageClass(book, chapter, startVerse, endVerse);
    const scripture = new ScriptureClass(passage, translations);
    return scripture;
  }

  private stripHtmlTags(text: string): string {
    return text
      .replace(/<\/?[^>]+(>|$)/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
