import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangeRoleDto } from './dto/change-role.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { AdminGuard } from './../shared/guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @Post('verify')
  verify(@Body() body: VerifyAuthDto) {
    return this.authService.verify(body);
  }

  @Post('login')
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }

  @UseGuards(AdminGuard)
  @Post('role')
  changeRole(@Body() body: ChangeRoleDto) {
    return this.authService.changeRole(body);
  }
 
}
