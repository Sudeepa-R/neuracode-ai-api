import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import { JwtAuthGuard } from 'src/auth-login/jwt-auth.gurads';
import { UserDetailsServise } from './UserDetails.services';
import { UsersDetails } from './userDetails.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

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
  async getAllUsersDetails(@Paginate() query: PaginateQuery): Promise<Paginated<UsersDetails>> {
    try {
      const data = await this.userServices.getAllUsers(query);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
