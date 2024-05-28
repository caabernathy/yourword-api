import { Controller, Get, Query } from '@nestjs/common';
import { ScriptureService } from './scripture.service';

@Controller('scripture')
export class ScriptureController {
  constructor(private readonly scriptureService: ScriptureService) {}

  @Get()
  getScripture(
    @Query('book') book: string,
    @Query('chapter') chapter: string,
    @Query('startVerse') startVerse: string,
    @Query('endVerse') endVerse: string,
  ) {
    const chapterNumber = parseInt(chapter, 10);
    const startVerseNumber = parseInt(startVerse, 10);
    const endVerseNumber = parseInt(endVerse, 10);
    return this.scriptureService.getScripture(
      book,
      chapterNumber,
      startVerseNumber,
      endVerseNumber,
    );
  }
}
