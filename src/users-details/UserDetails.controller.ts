import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../auth-login/jwt-auth.gurads';
import { UserDetailsServise } from './UserDetails.services';
import { UsersDetails } from './userDetails.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UsersDetailsVm, UsersSaveDataVm } from '../view-model/user-details/user-details.vm';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('NCAUsers')
@Controller('NCAUsers')
export class UserDetailsController {
  constructor(private readonly userServices: UserDetailsServise) {}

  @Get('getAllUsers')
  @ApiQuery({
    name: 'page',
    type: Number,
    example: 1,
    required: false,
    description: 'The Page number',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    example: 20,
    required: false,
    description: 'The limit number',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    example: 'id:DESC',
    required: false,
    description:
      'The sortBy field you can pass this parameter multiple times with diffrent fields.',
  })
  @ApiQuery({
    name: 'searchBy',
    type: String,
    example: 'example@gmail.com',
    required: false,
    description:
      'The searchBy field you can pass this parameter multiple times with diffrent fields.',
  })
  @ApiQuery({
    name: 'filter.userEmail',
    type: String,
    example: 'in:example@gmail.com',
    required: false,
    description: 'You can add multiple filters',
  })
  @ApiOperation({
    summary: 'find all the usersDetails',
  })
  @ApiOkResponse({
    description: 'All users details fetched!!',
    type: UsersDetails,
  })
  async getAllUsersDetails(@Paginate() query: PaginateQuery): Promise<Paginated<UsersDetails>> {
    try {
      const data = await this.userServices.getAllUsers(query);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Save users details.',
  })
  @ApiOkResponse({
    description: 'Users data saved successfully.', 
    type: UsersDetails,
  })
  async saveUsersDetails(@Body() usersData:UsersSaveDataVm):Promise<UsersDetails>{
    try{
      return await this.userServices.saveUser(usersData)
    }
    catch(err){
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':userId')
  @ApiOperation({
    summary: 'Delete users details.',
  })
  @ApiOkResponse({
    description: 'Users data delted successfully.', 
    type: UsersDetails,
  })
  async deleteUsersDetails(@Param('userId') userId:number){
    try{
      return await this.userServices.deleteUser(userId)
    }
    catch(err){
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST)
    }
  }

  @Patch()
  @ApiOperation({
    summary: 'Update users details.',
  })
  @ApiOkResponse({
    description: 'Users data updated successfully.', 
    type: UsersDetails,
  })
  async updateUsersDetails(@Body() usersData:UsersDetailsVm){
    try{
      return await this.userServices.updateUsersDetails(usersData)
    }
    catch(err){
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST)
    }
  }

}
