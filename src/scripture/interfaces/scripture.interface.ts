/**
 * Copyright (c) Christine Abernathy.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BibleVersion } from '../enums/bible-version.enum';

export interface Translation {
  name: BibleVersion;
  text: string;
}

export interface ScriptureResponse {
  passage: {
    book: string;
    chapter: number;
    startVerse: number;
    endVerse: number;
  };
  translations: Translation[];
}
