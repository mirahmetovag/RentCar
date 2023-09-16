import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { IRequest } from '../types/request.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
    const req: IRequest = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1] ?? req.headers.authorization;
    
    const data = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY})
    
    req.user = data.id;
    
    return true;
    
    } catch (error) {
      return false
    }
  }
}