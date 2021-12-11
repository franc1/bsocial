import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public-route.decorator';
import { TokenParam } from 'src/decorators/token.decorator';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { LoginResponseDTO } from './dto/login.response.dto';
import { LocalAuthGuard } from './passport-strategies/local/local-auth.guard';
import { Token } from './passport-strategies/token.request';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiSecurity({})
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() login: LoginDTO,
    @TokenParam() token: Token,
  ): Promise<LoginResponseDTO> {
    return this.authService.login(token);
  }
}
