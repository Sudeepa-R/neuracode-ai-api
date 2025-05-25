import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'ProgrammingLanguages',
  versionKey: false,
  strict: false,
})
export class ProgrammingLanguages {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number, unique: true, required: true })
  plId: number;

  @Prop({ type: String, required: true })
  imgUrl: string;

  @Prop({ type: String, required: true, unique: true })
  plName: string;
}

export const ProgrammingLanguagesSchema =
  SchemaFactory.createForClass(ProgrammingLanguages);
