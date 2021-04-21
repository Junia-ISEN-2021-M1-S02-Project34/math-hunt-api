import mongoose, { Schema } from 'mongoose';
import IAnswer from '../interfaces/answer.interface';

const AnswerSchema: Schema = new Schema(
  {
    enigmaId: { type: Schema.Types.ObjectId, ref: 'Enigma' },
    isMcq: { type: Boolean, required: true },
    solution: { type: String, required: true },
    attemptsNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IAnswer>('Answer', AnswerSchema);
