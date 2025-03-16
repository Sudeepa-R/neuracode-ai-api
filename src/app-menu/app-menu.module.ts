import { Module } from '@nestjs/common';
import { AppMenuService } from './app-menu.service';
import { AppMenusControllers } from './app-menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppMenus, AppMenusSchema } from './app-menu.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppMenus.name, schema: AppMenusSchema },
    ]),
  ],
  providers: [AppMenuService],
  controllers: [AppMenusControllers]
})
export class MenusModule {}
