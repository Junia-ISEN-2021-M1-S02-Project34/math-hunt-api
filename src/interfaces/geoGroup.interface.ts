import { Document } from 'mongoose';

export default interface IGeoGroup extends Document {
  _id: string;
  name: string;
  positionX: number;
  positionY: number;
  radius: number;
  pictureUrl: string;
  order: number;
}
