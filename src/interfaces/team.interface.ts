import { Document } from 'mongoose';

export default interface ITeam extends Document {
  _id: string;
  username: string;
  password: string;
  score: number;
  gameId: string;
  progression: IEnigmaStatus[];
  currentEnigmaId: string;
  currentGeoGroupId: string;
  isConnected: boolean;
}

export interface IEnigmaStatus {
  geoGroupId: string;
  geoGroupName: string;
  geoGroupScore: number;
  geoGroupScoreValue: number;
  enigmasProgression: [{
    enigmaId: string;
    enigmaName: string;
    done: boolean;
    score: number;
    scoreValue: number;
    usedHintsIds: string[];
  }]
}
