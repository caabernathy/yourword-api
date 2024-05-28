import { BibleVersion } from './bible-version.enum';
import { Translation } from './translation.interface';

export class TranslationClass implements Translation {
  name: BibleVersion;
  text: string;

  constructor(name: BibleVersion, text: string) {
    this.name = name;
    this.text = text;
  }

  static fromJSON(json: any): TranslationClass {
    return new TranslationClass(json.name, json.text);
  }

  toJSON(): any {
    return {
      name: this.name,
      text: this.text,
    };
  }
}
