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

  // static fromJSON(json: any): ScriptureClass {
  //   const passage = PassageClass.fromJSON(json.passage);
  //   const translations = json.translations.map((translation: any) =>
  //     TranslationClass.fromJSON(translation),
  //   );
  //   return new ScriptureClass(passage, translations);
  // }

  // toJSON(): any {
  //   return {
  //     // id: this.id,
  //     // createdAt: this.createdAt,
  //     passage: this.passage.toJSON(),
  //     translations: this.translations.map((translation) =>
  //       translation.toJSON(),
  //     ),
  //   };
  // }
}
