import { Document } from 'mongoose';

export default interface IGame extends Document {
  _id: string;
  name: string;
  startDate: Date;
  duration: number;
  isStarted: boolean;
}
