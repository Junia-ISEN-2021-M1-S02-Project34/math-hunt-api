import mongoose, { Schema } from 'mongoose';
import ITeam from '../interfaces/team.interface';

const TeamSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    gameId: { type: String, required: true },
    progression: [{
      enigmaId: { type: Schema.Types.ObjectId, ref: 'EnigmasGroup' }, done: { type: Boolean, default: false }, score: { type: Number, default: 0 }, usedHintsIds: { type: Schema.Types.ObjectId, ref: 'Hint' },
    }],
    currentEnigmaId: { type: Schema.Types.ObjectId, ref: 'Enigma' },
    isConnected: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ITeam>('Team', TeamSchema);
