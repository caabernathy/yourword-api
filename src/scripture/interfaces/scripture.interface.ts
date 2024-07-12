/**
 * Copyright (c) Christine Abernathy.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface Translation {
  name: string;
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
