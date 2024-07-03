import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScriptureService } from './scripture.service';
import { GetScriptureDto } from './dto/get-scripture.dto';
import { ScriptureResponse } from './interfaces/scripture.interface';

@Controller('scripture')
export class ScriptureController {
  constructor(private scriptureService: ScriptureService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getScripture(
    @Query() getScriptureDto: GetScriptureDto,
  ): Promise<ScriptureResponse> {
    return this.scriptureService.getScripture(
      getScriptureDto.book,
      getScriptureDto.chapter,
      getScriptureDto.startVerse,
      getScriptureDto.endVerse,
    );
  }
}
