import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userAuthVm } from '../view-model/userLogin.vm';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { UsersDetails } from '../users-details/userDetails.entity';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { createFilterQuery } from '../utils/mongoDB-helper/mongoose-helper';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('UsersDetails')
    private readonly usersDetails: Model<UsersDetails>,
  ) {}

  async login(user: userAuthVm) {
    const payload = { userName: user.userName, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  
}
