import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userAuthVm } from 'src/view-model/userLogin.vm';
import { AuthService } from './auth.service';

@ApiTags('authLogin')
@Controller('authLogin')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: userAuthVm })
  @ApiOperation({ summary: 'Authenticate user credentials' })
  @ApiResponse({
    status: 200,
    description: 'List of employees retrieved successfully',
  })
  async login(@Body() user: { userName: string; password: string }) {
    return this.authService.login(user);
  }
}
