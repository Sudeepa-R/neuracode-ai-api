import { Module } from '@nestjs/common';
import { AuthModule } from './auth-login/auth.module';
import { DatabaseConfig } from './utils/db.config';

@Module({
  imports: [AuthModule, DatabaseConfig],
  controllers: [],
  providers: [],
})
export class AppModule {}
