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
