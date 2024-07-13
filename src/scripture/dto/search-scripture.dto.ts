/**
 * Copyright (c) Christine Abernathy.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IsString, IsEnum } from 'class-validator';
import { BibleVersion } from '../enums/bible-version.enum';

export class SearchScriptureDto {
  @IsEnum(BibleVersion)
  version: BibleVersion;

  @IsString()
  text: string;
}
