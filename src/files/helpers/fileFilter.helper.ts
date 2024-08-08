import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) {
    return callback(new Error('No file provided!'), false);
  }

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png'];

  if (!validExtensions.includes(fileExtension)) {
    return callback(
      new BadRequestException(`${file.mimetype} is not a valid document`),
      false,
    );
  }
  callback(null, true);
};
