import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { JwtAuthGuard } from 'src/auth-login/jwt-auth.gurads';
import { ProgrammingLanguagesServices } from './programmingLanguages.service';
import { ProgrammingLanguages } from './programmingLanguages.entity';
import { ProgrammingLanguagesVM } from '../view-model/ProgrammingLanguagesVM/ProgrammingLanguages.vm';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('ProgrammingLanguages')
@Controller('ProgrammingLanguages')
export class ProgrammingLanguagesController {
  constructor(
    private readonly prgammingLanguagesServices: ProgrammingLanguagesServices,
  ) {}

  @Get()
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
    name: 'filter.plId',
    type: String,
    example: 'eq:1',
    required: false,
    description: 'You can add multiple filters',
  })
  @ApiOperation({
    summary: 'find all the Programming Languages',
  })
  @ApiOkResponse({
    description: 'All Programming Languages fetched successfully!!',
    type: ProgrammingLanguages,
  })
  async get(@Paginate() query: PaginateQuery): Promise<Paginated<ProgrammingLanguages>> {
    return await this.prgammingLanguagesServices.getAllPrgammingLanguages(query);
  }

  @Post()
  @ApiOperation({
    summary: 'save/update all the Programming Languages',
  })
  @ApiOkResponse({
    description: ' Programming Languages saved/updated successfully!!',
    type: ProgrammingLanguages,
  })
  async save(@Body() updatedData: ProgrammingLanguagesVM): Promise<boolean> {
    return await this.prgammingLanguagesServices.save(updatedData);
  }

  @Delete(':plId')
  @ApiOperation({
    summary: 'Delete all the Programming Languages',
  })
  @ApiOkResponse({
    description: ' Programming Languages deleted successfully!!',
    type: ProgrammingLanguages,
  })
  async delete(@Param('plId') plId: number) {
    return await this.prgammingLanguagesServices.deletePL(plId);
  }
}
