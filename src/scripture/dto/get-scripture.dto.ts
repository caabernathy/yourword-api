import { IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetScriptureDto {
  @IsString()
  book: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  chapter: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  startVerse: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  endVerse: number;
}
