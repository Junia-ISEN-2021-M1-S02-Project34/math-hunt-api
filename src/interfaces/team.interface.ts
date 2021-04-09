import { Document } from 'mongoose';

export default interface ITeam extends Document {
  _id: string;
  username: string;
  password: string;
  score: number;
  gameId: string;
  progression: IEnigmaStatus[];
  currentEnigmaId: string;
  isConnected: boolean;
}

export interface IEnigmaStatus {
  enigmaId: string;
  done: boolean;
  score: number;
  usedHintsIds: string[];
}
