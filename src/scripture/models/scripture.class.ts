import { PassageClass } from './passage.class';
import { TranslationClass } from './translation.class';
// import { v4 as uuidv4 } from 'uuid';
import { Scripture } from './scripture.interface';

export class ScriptureClass implements Scripture {
  id: string;
  createdAt: Date;
  passage: PassageClass;
  translations: TranslationClass[];

  constructor(passage: PassageClass, translations: TranslationClass[]) {
    // this.id = uuidv4();
    // this.createdAt = new Date();
    this.passage = passage;
    this.translations = translations;
  }
}
