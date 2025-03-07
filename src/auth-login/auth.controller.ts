import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { userAuthVm } from '../view-model/userLogin.vm';
import { UsersDetails } from './userDetails.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { query } from 'express';
import { CustomResponse } from 'src/utils/response-structure';
import { JwtAuthGuard } from './jwt-auth.gurads';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('authLogin')
@Controller('authLogin')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: userAuthVm })
  @ApiOperation({ summary: 'Authenticate user credentials' })
  @ApiResponse({
    status: 200,
    description: 'List of employees retrieved successfully',
  })
  async login(@Body() user: { userName: string; password: string }) {
    return this.authService.login(user);
  }



  @Get('getAllUsers')
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth() 
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
    example: 'userEmail',
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
  async getAllUsersDetails(@Paginate() query: PaginateQuery,): Promise<Paginated<UsersDetails>> {
    try {
      const data = await this.authService.getAllUsers(query);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
