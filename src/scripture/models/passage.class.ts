import { Passage } from './passage.interface';
// import { v4 as uuidv4 } from 'uuid';

export class PassageClass implements Passage {
  // id: string;
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;

  constructor(
    book: string,
    chapter: number,
    startVerse: number,
    endVerse: number,
  ) {
    // this.id = uuidv4();
    this.book = book;
    this.chapter = chapter;
    this.startVerse = startVerse;
    this.endVerse = endVerse;
  }
}
