import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScriptureModule } from './scripture/scripture.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigService available application-wide
    }),
    ScriptureModule,
  ],
})
export class AppModule {}
