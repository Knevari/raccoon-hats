import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { HatStyle } from '../types';

export type HatDocument = HydratedDocument<Hat>;

@Schema()
export class Hat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  sizes: string[];

  @Prop({ required: true })
  colors: string[];

  @Prop({ required: true, enum: HatStyle })
  style: HatStyle;

  @Prop({ required: true })
  details: string;
}

export const HatSchema = SchemaFactory.createForClass(Hat);
