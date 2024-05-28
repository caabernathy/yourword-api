import { Module } from '@nestjs/common';
import { ScriptureController } from './scripture.controller';
import { ScriptureService } from './scripture.service';

@Module({
  controllers: [ScriptureController],
  providers: [ScriptureService],
})
export class ScriptureModule {}
