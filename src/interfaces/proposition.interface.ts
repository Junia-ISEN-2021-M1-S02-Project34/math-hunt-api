import { Document } from 'mongoose';

export default interface IProposition extends Document {
  text: string;
  answerId: string;
}
