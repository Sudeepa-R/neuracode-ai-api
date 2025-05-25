import { ApiProperty } from "@nestjs/swagger";


export class ProgrammingLanguagesVM{
  @ApiProperty({
    description: 'Programming Languages Id',
    example: 1000,
    nullable: false,
  })
  plId?: number;

  @ApiProperty({
    description: 'Image URL In Base64',
    example: null,
    nullable: false,
  })
  imgUrl: string;

  @ApiProperty({
    description: 'Programming Languages title',
    example: null,
    nullable: false,
  })
  plName: string;
}
