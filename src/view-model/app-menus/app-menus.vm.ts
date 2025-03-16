import { ApiProperty } from '@nestjs/swagger';

export class AppMenusVm {
  @ApiProperty({
    description: 'menuId',
    example: 1000,
    nullable: false,
  })
  menuId?: number;

  @ApiProperty({
    description: 'menu',
    example: '',
    nullable: false,
  })
  menu: string;

  @ApiProperty({
    description: 'navigateTo',
    example: '',
    nullable: false,
  })
  navigateTo: string;

  @ApiProperty({
    description: 'menuDescription',
    example: '',
    nullable: false,
  })
  menuDescription: string;

  @ApiProperty({
    description: 'icon',
    example: '',
    nullable: false,
  })
  icon: string;

  @ApiProperty({
    description: 'viewFor',
    example: '',
    nullable: false,
  })
  viewFor: string;
}
