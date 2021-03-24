import { Document } from 'mongoose';

export default interface IAnswer extends Document {
  enigmaId: string;
  isMcq: boolean;
  solution: string;
  attemptsNumber: number;
}
