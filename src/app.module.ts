import { Module } from '@nestjs/common';
import { AuthModule } from './auth-login/auth.module';
import { UserDetailsModule } from './users-details/UserDetails.module';
import { DatabaseConfig } from './utils/db.config';
import { MenusModule } from './app-menu/app-menu.module';

@Module({
  imports: [AuthModule, DatabaseConfig, UserDetailsModule, MenusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
