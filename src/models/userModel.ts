import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  fristName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  fristName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model<IUser>("User", userSchema);
