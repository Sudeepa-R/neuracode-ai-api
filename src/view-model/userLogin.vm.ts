import { ApiProperty } from "@nestjs/swagger";

export  class userAuthVm{
    @ApiProperty({
        description:'UserName',
        example:'admin@neuracode.ai',
        nullable:false
    })
    userName:string;

    @ApiProperty({
        description:'UserName',
        example:'Admin@123',
        nullable:false
    })
    password:string;

}