import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import { UserConfig } from './interfaces/user-config.interface';
import { User } from './interfaces/user.interface';
import { USER_CONFIG_TOKEN } from './user.module';
import { IQsGetAllUser } from './interfaces/qs-get-all-user.interface';
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_CONFIG_TOKEN) private readonly userConfig: UserConfig,
  ) {}

  async getAllUser(qs: IQsGetAllUser) {
    const { limit, skip } = qs;
    const usersData = (
      await fs.readFile(join(this.userConfig.dirname, this.userConfig.filename))
    ).toString();

    const parseUsersData = JSON.parse(usersData);
    if (Array.isArray(parseUsersData)) {
      let res = parseUsersData as User[];

      if (skip) {
        res = res.slice(skip);
      }

      if (limit) {
        res = res.slice(0, limit);
      }

      return res;
    }
  }
}
