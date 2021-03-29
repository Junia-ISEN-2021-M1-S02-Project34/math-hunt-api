import mongoose, { Schema } from 'mongoose';
import IHint from '../interfaces/hint.interface';

const HintSchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    text: { type: String, required: true },
    rank: { type: Number, required: true },
    penalty: { type: Number, required: true },
    propositionToRemove: { type: Schema.Types.ObjectId, ref: 'Proposition' },
    enigmaId: { type: Schema.Types.ObjectId, ref: 'Enigma' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IHint>('Hint', HintSchema);
