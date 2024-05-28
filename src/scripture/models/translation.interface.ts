import { BibleVersion } from './bible-version.enum';

export interface Translation {
  name: BibleVersion;
  text: string;
}
