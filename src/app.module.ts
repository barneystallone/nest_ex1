import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    UserModule.forFeature({
      dirname: __dirname,
      filename: 'users.json',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
