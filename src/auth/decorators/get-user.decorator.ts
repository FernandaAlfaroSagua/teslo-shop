import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    // const filteredUser: any = {};

    if (!user) {
      throw new InternalServerErrorException('User not found (request)');
    }

    // Si la data es un array, devolver un objeto con las propiedades que se pidieron
    // if (data && Array.isArray(data)) {
    //   for (const key of data) {
    //     if (key in user) {
    //       filteredUser[key] = user[key];
    //     }
    //   }
    // }

    return data ? user[data] : user;
    // return data ? filteredUser : user;
  },
);
