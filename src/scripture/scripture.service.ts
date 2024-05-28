import { Injectable } from '@nestjs/common';
import { ScriptureClass } from './models/scripture.class';
import { PassageClass } from './models/passage.class';
import { TranslationClass } from './models/translation.class';
import { BibleVersion } from './models/bible-version.enum';

@Injectable()
export class ScriptureService {
  getScripture(
    book: string,
    chapter: number,
    startVerse: number,
    endVerse: number,
  ): ScriptureClass {
    const passage = new PassageClass(book, chapter, startVerse, endVerse);
    const translations = [
      new TranslationClass(
        BibleVersion.NIV,
        'But if serving the Lord seems undesirable to you, then choose for yourselves this day whom you will serve, whether the gods your ancestors served beyond the Euphrates, or the gods of the Amorites, in whose land you are living. But as for me and my household, we will serve the LORD.',
      ),
      new TranslationClass(
        BibleVersion.ESV,
        'And if it is evil in your eyes to serve the Lord, choose this day whom you will serve, whether the gods your fathers served in the region beyond the River, or the gods of the Amorites in whose land you dwell. But as for me and my house, we will serve the LORD.',
      ),
      new TranslationClass(
        BibleVersion.NLT,
        'But if you refuse to serve the Lord, then choose today whom you will serve. Would you prefer the gods your ancestors served beyond the Euphrates? Or will it be the gods of the Amorites in whose land you now live? But as for me and my family, we will serve the LORD.',
      ),
      new TranslationClass(
        BibleVersion.KJV,
        'And if it seem evil unto you to serve the Lord, choose you this day whom ye will serve; whether the gods which your fathers served that were on the other side of the flood, or the gods of the Amorites, in whose land ye dwell: but as for me and my house, we will serve the LORD.',
      ),
    ];
    const scripture = new ScriptureClass(passage, translations);

    return scripture;
  }
}
