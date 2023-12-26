import { Controller, Get, Query } from '@nestjs/common';
import { IQsGetAllUser } from './interfaces/qs-get-all-user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(@Query() qs: IQsGetAllUser) {
    return this.userService.getAllUser({ limit: qs.limit ?? 5, skip: qs.skip });
  }
}
