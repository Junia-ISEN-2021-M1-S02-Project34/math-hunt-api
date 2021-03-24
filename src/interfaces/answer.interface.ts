import { Document } from 'mongoose';

export default interface IAnswer extends Document {
  enigmaId: string;
  type: string;
  solution: string;
  attemptsNumber: number;
}
