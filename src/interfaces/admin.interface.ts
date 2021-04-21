import { Document } from 'mongoose';

export default interface IAdmin extends Document {
  username: string;
  password: string;
}
