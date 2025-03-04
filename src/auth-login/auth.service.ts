import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userAuthVm } from '../view-model/userLogin.vm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user: userAuthVm) {
    const payload = { userName: user.userName, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
