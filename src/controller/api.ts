import { Inject, Controller, Get, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/getUser')
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    console.log('this.userService', uid);
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
