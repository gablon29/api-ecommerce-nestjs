import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserDto } from '../userDto';

export class UserCreateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const body: UserDto = req.body;
    } catch (error) {
      res.status(400).send({ message: 'Error en la operacion', error });
    }
    next();
  }
}
