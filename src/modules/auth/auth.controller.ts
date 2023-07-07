import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, LoginResponse, SignUpInput } from './dto/auth.dto';
import { User } from '../../entities';
import { JwtAuthGuard } from './guards/jwt-guard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginInput: LoginInput): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  }

  @Post('signup')
  async signup(@Body() signUpInput: SignUpInput): Promise<User> {
    return this.authService.signup(signUpInput);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req): Promise<Partial<User>> {
    const user = req.user;
    return this.authService.profile(user.id);
  }
}
