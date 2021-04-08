import { Document } from 'mongoose';

export default interface IProposition extends Document {
  _id: string;
  text: string;
  answerId: string;
}
