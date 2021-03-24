import mongoose, { Schema } from 'mongoose';
import IAdmin from '../interfaces/admin.interface';

const AdminSchema: Schema = new Schema(
  {
    username: { type: String, index: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IAdmin>('Admin', AdminSchema);
