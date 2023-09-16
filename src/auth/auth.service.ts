import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ForbiddenException, Inject, Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import * as bcrypt from 'bcrypt'; 
import { ChangeRoleDto } from './dto/change-role.dto';

@Injectable()
export class AuthService {
  @Inject() private readonly usersService: UsersService
  @Inject() private readonly mailService: MailService
  @Inject() private readonly jwtService:  JwtService
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){};
  async register({email, username, password}: RegisterAuthDto) {
    console.log(username);
    
    // const user = await this.usersService.findByUsername(username);
    // if (user) throw new ForbiddenException('Username already exists');
    // const hashedPass = await bcrypt.hash(password, 10);

    // const Otp = Math.floor(100000 + Math.random() * 900000);

    // this.cacheManager.set(username, JSON.stringify({otp: Otp, password: hashedPass, count: 3}));

    // const html = `<b>Code: ${Otp}</b>`
    // this.mailService.sendMail(email, html);
    return {message: 'OK'}
  }

  async verify ({username, otp}: VerifyAuthDto) {
    const cache: string = await this.cacheManager.get(username);
    if (!cache) throw new ForbiddenException('Invalid code');
    const res = JSON.parse(cache);
    if(res.count == 0) throw new ForbiddenException('Invalid code')
    if (res.otp != otp) {
      this.cacheManager.set(username, JSON.stringify({otp: res.otp, password: res.password, count: res.count - 1}));
      throw new ForbiddenException('Invalid code');
    }
    const role = 'User'
    
    if(username == process.env.SUPERADMIN_USERNAME) {
      const role = 'SuperAdmin';
    } 
    const newUser = await this.usersService.create({
      username,
      password: res.password,
      role
    });
    console.log(newUser._id);
    
    
    // const token = await this.jwtService.signAsync({id: newUser._id});
    await this.cacheManager.del(username);
    return {message: 'You are registered'}
    
  }

  async login({username, password}: LoginAuthDto) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new ForbiddenException('Invalid username or password 1');

    const isPass = await bcrypt.compare(password, user.password);
    if(!isPass) throw new ForbiddenException('Invalid username or password 2');

    const token = await this.jwtService.signAsync({id: user._id});
    return {message: 'You are logged in', token};
  }

  async changeRole({username, role}: ChangeRoleDto) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new BadRequestException('User was not found');
    user.role = role;
    await user.save();
    return {message: 'Role was updated'};
  }
}
