import mongoose, { Schema } from 'mongoose';
import IGame from '../interfaces/game.interface';

const GameSchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    startDate: { type: Date },
    duration: { type: Number },
    isStarted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IGame>('Game', GameSchema);
