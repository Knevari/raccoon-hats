import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { HatStyle } from '../types';
import { LocalFile } from 'src/local-files/schemas/local-file.schema';

export type HatDocument = HydratedDocument<Hat>;

@Schema()
export class Hat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: LocalFile.name, required: true })
  image: Types.ObjectId;

  @Prop({ required: false })
  imageId: string;

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
