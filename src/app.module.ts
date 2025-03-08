import { Module } from '@nestjs/common';
import { AuthModule } from './auth-login/auth.module';
import { UserDetailsModule } from './users-details/UserDetails.module';
import { DatabaseConfig } from './utils/db.config';

@Module({
  imports: [AuthModule,DatabaseConfig, UserDetailsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
