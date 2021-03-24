import { Document } from 'mongoose';

export default interface IGame extends Document {
  name: string;
  startDate: Date;
  duration: number;
  isStarted: boolean;
}
