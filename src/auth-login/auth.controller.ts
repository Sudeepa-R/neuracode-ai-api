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
import { UsersDetails } from '../users-details/userDetails.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { query } from 'express';
import { CustomResponse } from '../utils/response-structure';
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
  async login(@Body() user:userAuthVm) {
    try{
      return this.authService.login(user);
    }
    catch(err){
      throw new HttpException(err.message,err.statusCode||HttpStatus.BAD_REQUEST)
    }
   
  }

}
