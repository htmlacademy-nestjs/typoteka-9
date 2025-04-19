import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req } from '@nestjs/common';

import { LoginUserDto } from '@project/authentication';

import { ApplicationServiceURL } from './app.config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
