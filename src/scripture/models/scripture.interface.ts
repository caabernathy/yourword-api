import { Passage } from './passage.interface';
import { Translation } from './translation.interface';

export interface Scripture {
  id?: string;
  createdAt?: Date;
  passage: Passage;
  translations: Translation[];
  completed?: boolean;
}
