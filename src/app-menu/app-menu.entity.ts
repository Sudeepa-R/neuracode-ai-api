import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'appMenus',
  versionKey: false,
})
export class AppMenus {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: Number, unique: true })
  menuId: number;

  @Prop({ required: true, type: String, unique: false })
  menuTitle: string;

  @Prop({ required: true, type: String, unique: false })
  navigateTo: string;

  @Prop({ required: true, type: String, unique: false })
  menuDescription: string;

  @Prop({ required: true, type: String, unique: false })
  icon: string;

  @Prop({ required: true, type: String, unique: false })
  viewFor: string;
}

export const AppMenusSchema = SchemaFactory.createForClass(AppMenus);
