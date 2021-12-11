import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Public } from 'src/decorators/public-route.decorator';
import { ErrorResponse } from 'src/shared/error.response';

import { UserRegisterDTO } from './models/dto/user-register.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
@ApiBadRequestResponse({
  type: ErrorResponse,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiSecurity({})
  @Public()
  @Post()
  async register(@Body() userDTO: UserRegisterDTO): Promise<User> {
    const user = await this.userService.register(userDTO);

    return plainToClass(User, user);
  }
}
