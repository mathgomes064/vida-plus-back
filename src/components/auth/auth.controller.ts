// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.login.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.cpf, loginDto.password, loginDto.userType);
    return this.authService.login(user);
  }
}
