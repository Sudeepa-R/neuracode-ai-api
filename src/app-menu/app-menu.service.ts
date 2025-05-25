import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppMenus } from './app-menu.entity';
import { AppMenusVm } from '../view-model/app-menus/app-menus.vm';
import { Model } from 'mongoose';
import { autoIncrementIds } from 'src/utils/mongoDB-helper/mongoose-helper';

@Injectable()
export class AppMenuService {
  constructor(
    @InjectModel(AppMenus.name)
    private readonly appMenus: Model<AppMenus>,
  ) {}

  async get(viewFor: string): Promise<AppMenusVm[]> {
    try {
      if (viewFor === 'admin') {
        return await this.appMenus.find();
      }
      return await this.appMenus.find({ viewFor: viewFor });
    } catch (err) {
      throw err;
    }
  }

  async save(data: AppMenusVm): Promise<AppMenusVm> {
    if (!data) {
      throw new HttpException(
        'Please enter correct details',
        HttpStatus.BAD_REQUEST,
      );
    }
    const appMenu = await this.appMenus.find();
    if (data?.menuId) {
      return await this.update(data)
    }
    data['menuId'] = autoIncrementIds(appMenu, 'menuId');
    return await this.appMenus.create(data);
  }

  async update(data: AppMenusVm): Promise<AppMenusVm> {
    if (!data) {
      throw new HttpException(
        'Please enter correct details',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.appMenus.findOneAndUpdate({ menuId: data.menuId }, data);
  }

  async delete(menuId: number): Promise<boolean> {
    if (!menuId) {
      throw new HttpException('Invalid Menu Id', HttpStatus.BAD_REQUEST);
    }
    return await this.appMenus.findOneAndDelete({ menuId: menuId });
  }

  async getById(menuId: number): Promise<AppMenusVm> {
    if (!menuId) {
      throw new HttpException('Invalid Menu Id', HttpStatus.BAD_REQUEST);
    }
    const a = await this.appMenus.findOne({ menuId: menuId });
    return a;
  }
}
