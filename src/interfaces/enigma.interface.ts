import { Document } from 'mongoose';

export default interface IEnigma extends Document {
  _id: string;
  name: string;
  description: string;
  pictureUrl: string;
  question: string;
  positionX: number;
  positionY: number;
  scoreValue: number;
  isActive: boolean;
  geoGroupId: string;
  order: number;
}
