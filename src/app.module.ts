import { Module } from '@nestjs/common';
import { ScriptureModule } from './scripture/scripture.module';

@Module({
  imports: [ScriptureModule],
})
export class AppModule {}
