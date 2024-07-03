/**
 * Copyright (c) Christine Abernathy.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
