/**
 * Copyright (c) Christine Abernathy.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BibleVersion } from '../enums/bible-version.enum';

export const bibleVersionDisplayMap: Record<BibleVersion, string> = {
  [BibleVersion.NIV2011]: 'NIV',
  [BibleVersion.NIV]: 'NIV',
  [BibleVersion.ESV]: 'ESV',
  [BibleVersion.NLT]: 'NLT',
  [BibleVersion.KJV]: 'KJV',
};
