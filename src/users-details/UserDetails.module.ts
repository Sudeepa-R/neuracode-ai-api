import { Module } from '@nestjs/common';
import { UserDetailsController } from './UserDetails.controller';
import { UserDetailsServise } from './UserDetails.services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetailsSchema, UsersDetails } from './userDetails.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersDetails.name, schema: UserDetailsSchema },
    ]),
  ],
  providers: [UserDetailsServise],
  controllers: [UserDetailsController],
})
export class UserDetailsModule {}
