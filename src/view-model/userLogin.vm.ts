import { ApiProperty } from '@nestjs/swagger';

export class userAuthVm {
  @ApiProperty({
    description: 'UserName',
    example: 'admin@neuracode.ai',
    nullable: false,
  })
  userName: string;

  @ApiProperty({
    description: 'UserName',
    example: 'Admin@123',
    nullable: false,
  })
  password: string;
}

export class UsersDetailsVm {
  @ApiProperty({
    description: 'userId',
    example: 1000,
    nullable: false,
  })
  userId: number;

  @ApiProperty({
    description: 'userName',
    example: '',
    nullable: false,
  })
  userName: string;

  @ApiProperty({
    description: 'userEmail',
    example: 'example@gmail.com',
    nullable: false,
  })
  userEmail: string;

  @ApiProperty({
    description: 'userEmail',
    example: null,
    nullable: true,
  })
  userPhoneNumber: number;

  @ApiProperty({
    description: 'userEmail',
    example: 'Exampe@123',
    nullable: true,
  })
  password: string;
}
