import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HatSize, HatStyle } from '../types';

export type HatDocument = HydratedDocument<Hat>;

@Schema()
export class Hat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true, enum: HatSize, type: [String] })
  sizes: HatSize[];

  @Prop({ required: true })
  colors: string[];

  @Prop({ required: true, enum: HatStyle, type: String })
  style: HatStyle;

  @Prop({ required: true })
  details: string;
}

export const HatSchema = SchemaFactory.createForClass(Hat);
