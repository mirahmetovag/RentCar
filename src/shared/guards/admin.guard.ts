import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { IRequest } from '../types/request.types';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
    const req: IRequest = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1] ?? req.headers.authorization;
    
    const data = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY})
    
    if(data.username != process.env.SUPERADMIN_USERNAME) throw new ForbiddenException('You are not allowed to go through')
    
    return true;
    
    } catch (error) {
      return false
    }
  }
}