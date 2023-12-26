import { DynamicModule, Module } from '@nestjs/common';
import { UserConfig } from './interfaces/user-config.interface';
import { UserController } from './user.controller';
import { UserService } from './user.service';

export const USER_CONFIG_TOKEN = 'USER_CONFIG_TOKEN' as const;

@Module({})
export class UserModule {
  static forFeature(userConfig: UserConfig): DynamicModule {
    return {
      module: UserModule,
      controllers: [UserController],
      providers: [
        {
          provide: USER_CONFIG_TOKEN,
          useValue: userConfig,
        },
        {
          provide: UserService,
          useFactory: (userConfig: UserConfig) => {
            return new UserService(userConfig);
          },
          inject: [USER_CONFIG_TOKEN],
        },
      ],
      //   exports: [UserService]
    };
  }
}
