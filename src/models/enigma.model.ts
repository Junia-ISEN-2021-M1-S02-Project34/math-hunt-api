import mongoose, { Schema } from 'mongoose';
import IEnigma from '../interfaces/enigma.interface';

const EnigmaSchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: false },
    question: { type: String, required: true },
    positionX: { type: Number, required: true },
    positionY: { type: Number, required: true },
    scoreValue: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
    enigmaGroupId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IEnigma>('Enigma', EnigmaSchema);
