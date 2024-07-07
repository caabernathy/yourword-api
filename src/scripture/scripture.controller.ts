/**
 * Copyright (c) Christine Abernathy.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScriptureService } from './scripture.service';
import { GetScriptureReferenceDto } from './dto/get-scripture-reference.dto';
import { ScriptureResponse } from './interfaces/scripture.interface';

@Controller('scripture')
export class ScriptureController {
  constructor(private scriptureService: ScriptureService) {}

  @Get('reference')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getScriptureByReference(
    @Query() getScriptureReferenceDto: GetScriptureReferenceDto,
  ): Promise<ScriptureResponse> {
    return this.scriptureService.getScripture(
      getScriptureReferenceDto.book,
      getScriptureReferenceDto.chapter,
      getScriptureReferenceDto.startVerse,
      getScriptureReferenceDto.endVerse,
    );
  }
}
