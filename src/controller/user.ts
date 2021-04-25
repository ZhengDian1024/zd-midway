import {
  Inject,
  Controller,
  Get,
  Provide,
  Query,
  ALL,
  Param,
  HttpCode,
  SetHeader,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/getUser')
  async getUser(@Query(ALL) query: any): Promise<IGetUserResponse> {
    console.log('this.userService', query);
    const user = await this.userService.getUser({ uid: query.uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/getUserDetail/:uid')
  @HttpCode(200)
  @SetHeader('x-bbb', '223444')
  async getUserDetail(@Param() uid: string): Promise<IGetUserResponse> {
    console.log('this.userService', this.userService);
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'ok', data: user };
  }
}
