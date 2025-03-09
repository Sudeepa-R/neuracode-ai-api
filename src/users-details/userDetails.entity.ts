import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  strict: true,
  collection: 'UsersDetails',
  versionKey: false,
  autoIndex: false,
})
export class UsersDetails {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: Number, unique: true })
  userId: number;

  @Prop({ required: true, type: String, unique: false })
  userName: string;

  @Prop({ required: true, type: String, unique: true })
  userEmail: string;

  @Prop({ type: Number, unique: true })
  userPhoneNumber: number;

  @Prop({ required: true, type: String, unique: true })
  password: string;
}

export const UserDetailsSchema = SchemaFactory.createForClass(UsersDetails);
