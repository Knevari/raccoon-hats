import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MemoryStoredFile } from 'nestjs-form-data';

// Cloudinary has problems with imports,
// sadly this will only work if imported using require
const cloudinary = require('cloudinary');
const toStream = require('buffer-to-stream');

import type { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.v2.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  uploadImage(
    file: MemoryStoredFile,
    location: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: location,
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteFolder(folderPath: string) {
    const deleteResponse = await cloudinary.v2.api.delete_folder(folderPath, {
      skip_backup: true,
    });
    return deleteResponse.deleted.length > 0;
  }
}
