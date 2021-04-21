import mongoose, { Schema } from 'mongoose';
import IProposition from '../interfaces/proposition.interface';

const PropositionSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    answerId: { type: Schema.Types.ObjectId, ref: 'Answer' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IProposition>('Proposition', PropositionSchema);
