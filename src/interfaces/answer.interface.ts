import { Document } from 'mongoose';

export default interface IAnswer extends Document {
  _id: string;
  enigmaId: string;
  isMcq: boolean;
  solution: string;
  attemptsNumber: number;
}
