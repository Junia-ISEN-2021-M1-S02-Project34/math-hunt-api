import mongoose, { Schema } from 'mongoose';
import IAnswer from '../interfaces/answer.interface';

const AnswerSchema: Schema = new Schema(
  {
    enigmaId: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    solution: { type: String, required: true },
    attemptsNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IAnswer>('Answer', AnswerSchema);
