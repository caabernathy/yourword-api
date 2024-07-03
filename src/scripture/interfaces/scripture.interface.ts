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
