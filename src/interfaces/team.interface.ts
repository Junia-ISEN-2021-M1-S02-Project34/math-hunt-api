import { Document } from 'mongoose';

export default interface ITeam extends Document {
  username: string;
  password: string;
  score: number;
  gameId: string;
  progression: EnigmaStatus[];
  currentEnigmaId: string;
}

interface EnigmaStatus {
  enigmaId: string;
  done: boolean;
  score: number;
}
