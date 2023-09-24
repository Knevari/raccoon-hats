import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type LocalFileDocument = HydratedDocument<LocalFile>;

@Schema()
export class LocalFile {
  @Prop({ required: false, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  mimetype: string;
}

export const LocalFileSchema = SchemaFactory.createForClass(LocalFile);
