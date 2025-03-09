import { ApiProperty } from '@nestjs/swagger';

export class userAuthVm {
  @ApiProperty({
    description: 'User Email',
    example: 'admin@neuracode.ai',
    nullable: false,
  })
  userEmail: string;

  @ApiProperty({
    description: 'User Password',
    example: 'Admin@123',
    nullable: false,
  })
  password: string;
}

