import mongoose, { Schema } from 'mongoose';
import IGeoGroup from '../interfaces/geoGroup.interface';

const GeoGroupSchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    positionX: { type: Number, required: true },
    positionY: { type: Number, required: true },
    radius: { type: Number, required: true },
    pictureUrl: { type: String, required: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IGeoGroup>('GeoGroup', GeoGroupSchema);
