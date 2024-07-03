/**
 * Copyright (c) Christine Abernathy.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScriptureController } from './scripture.controller';
import { ScriptureService } from './scripture.service';

@Module({
  imports: [HttpModule],
  controllers: [ScriptureController],
  providers: [ScriptureService],
})
export class ScriptureModule {}
