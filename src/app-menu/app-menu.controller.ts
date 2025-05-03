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
import { AppMenuService } from './app-menu.service';
import { JwtAuthGuard } from 'src/auth-login/jwt-auth.gurads';
import { AppMenus } from './app-menu.entity';
import { AppMenusVm } from '../view-model/app-menus/app-menus.vm';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('AppMenus')
@Controller('AppMenus')
export class AppMenusControllers {
  constructor(private readonly appMenusService: AppMenuService) {}

  @Get(':viewFor')
  @ApiOperation({
    summary: 'find all the App Menus',
  })
  @ApiOkResponse({
    description: 'All app menus fetched!!',
    type: AppMenus,
  })
  async get(@Param('viewFor') viewFor: string): Promise<AppMenusVm[]> {
    try {
      return await this.appMenusService.get(viewFor);
    } catch (err) {
      throw new HttpException(err.message, err.statuseCode);
    }
  }
  @Get('getById/:menuId')
  @ApiOperation({
    summary: 'find the App Menus by menuId',
  })
  @ApiOkResponse({
    description: 'App menus fetched!!',
    type: AppMenus,
  })
  async getBymenuId(@Param('menuId') menuId: number): Promise<AppMenusVm> {
    try {
      return await this.appMenusService.getById(menuId);
    } catch (err) {
      throw new HttpException(err.message, err.statuseCode);
    }
  }
  @Post()
  @ApiOperation({
    summary: 'Save all the App Menus',
  })
  @ApiOkResponse({
    description: 'App Menus saved successfully.',
    type: AppMenus,
  })
  async save(@Body() data: AppMenusVm): Promise<AppMenusVm> {
    try {
      return await this.appMenusService.save(data);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statuseCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch()
  @ApiOperation({
    summary: 'App Menus users details.',
  })
  @ApiOkResponse({
    description: 'App menus updated successfully.',
    type: AppMenus,
  })
  async update(@Body() data: AppMenusVm): Promise<AppMenusVm> {
    try {
      return await this.appMenusService.update(data);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':menuId')
  @ApiOperation({
    summary: 'Delete App Menus.',
  })
  @ApiOkResponse({
    description: 'App Menus deleted successfully.',
    type: AppMenus,
  })
  async deleteAppMenus(@Param('menuId') menuId: number): Promise<boolean> {
    try {
      return await this.appMenusService.delete(menuId);
    } catch (err) {
      throw err;
    }
  }
}
