import { Document } from 'mongoose';

export default interface ITeam extends Document {
  username: string;
  password: string;
  score: number;
  gameId: string;
  enigmaList: string[];
  currentEnigmaId: string;
}
