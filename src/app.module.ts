import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
   MongooseModule.forRoot('mongodb://mongoadmin:mongoadmin@localhost:27018', {}),
    UsersModule,
    //ConfigModule.forRoot({isGlobal: true}),
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
