import { Controller, Get, Query } from '@nestjs/common';
import { ScriptureService } from './scripture.service';

@Controller('scripture')
export class ScriptureController {
  constructor(private readonly scriptureService: ScriptureService) {}

  @Get()
  getScripture(
    @Query('book') book: string,
    @Query('chapter') chapter: number,
    @Query('startVerse') startVerse: number,
    @Query('endVerse') endVerse: number,
  ) {
    return this.scriptureService.getScripture(
      book,
      chapter,
      startVerse,
      endVerse,
    );
  }
}
