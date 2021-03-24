import { Document } from 'mongoose';

export default interface IGeoGroup extends Document {
  name: string;
  positionX: number;
  positionY: number;
  radius: number;
  pictureUrl: string;
}
