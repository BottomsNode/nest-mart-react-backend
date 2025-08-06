import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CustomUnauthorizedException, RequestWithUser } from 'src/common';
import { Request } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDTO, @Req() req: Request) {
    return this.authService.login(body, req);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async logout(@Req() req: RequestWithUser) {
    const user = req.user;
    if (!user || !user.userId) {
      throw new CustomUnauthorizedException('User not authenticated');
    }
    await this.authService.logout(user.userId);
    return { message: 'Logged out successfully' };
  }
}
