import { Document } from 'mongoose';

export default interface ITeam extends Document {
  _id: string;
  username: string;
  password: string;
  score: number;
  gameId: string;
  progression: EnigmaStatus[];
  currentEnigmaId: string;
  isConnected: boolean;
}

interface EnigmaStatus {
  enigmaId: string;
  done: boolean;
  score: number;
}
