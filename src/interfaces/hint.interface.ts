import { Document } from 'mongoose';

export default interface IHint extends Document {
  _id: string;
  name: string;
  text: string;
  rank: number;
  penalty: number;
  propositionToRemove: string;
  enigmaId: string;
}
