import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userAuthVm } from '../view-model/userLogin.vm';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { UsersDetails } from '../users-details/userDetails.entity';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { createFilterQuery } from '../utils/mongoDB-helper/mongoose-helper';
import * as bcrypt from 'bcrypt';
import { UserDetailsServise } from '../users-details/UserDetails.services';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('UsersDetails')
    private readonly usersDetails: Model<UsersDetails>,
    private readonly userDeatilsService: UserDetailsServise,
  ) {}

  async login(user: userAuthVm) {

    try{
    if(!user){
      throw new HttpException("Invalid credentials",HttpStatus.BAD_REQUEST)
    }
    const UserExist=await this.usersDetails.findOne({userEmail:user.userEmail})
    if(!UserExist || !await bcrypt.compare(user.password,UserExist.password)){
      throw new HttpException("Either password or username is wrong!",HttpStatus.BAD_REQUEST)
    }
    return {
      access_token: this.jwtService.sign({UserExist}),
      status:true,
      statusCode:HttpStatus.OK,
      message:"Users authorized successfully."
    };
  }
  catch(err){
    throw err
  }
  }

  
}
