import { Module } from '@nestjs/common';
import { AuthModule } from './auth-login/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
