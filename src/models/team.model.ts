import mongoose, { Schema } from 'mongoose';
import ITeam from '../interfaces/team.interface';

const TeamSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    gameId: { type: String, required: true },
    enigmaList: [{ type: Schema.Types.ObjectId, ref: 'EnigmasGroup' }],
    currentEnigma: { type: Schema.Types.ObjectId, ref: 'Enigma' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ITeam>('Team', TeamSchema);
