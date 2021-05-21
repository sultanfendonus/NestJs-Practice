import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { secretKey } from '../helper/constant';
import { CustomException } from '../../helper/custom.exception';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.split(' ')[1];
      request.user = jwt.verify(token, secretKey);
    } catch (e) {
      throw new CustomException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ['Unauthorized User'],
          error: 'Invalid credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}
