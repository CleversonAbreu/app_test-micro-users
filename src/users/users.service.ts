import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>){}

    private readonly logger= new Logger(UsersService.name) 
    

    async createUser(category:User):Promise<User>{
         console.log('createUser')
      try {
         const userCreated = new this.userModel(category)
          console.log(`${JSON.stringify(category)}`)
            return await userCreated.save()
      } catch (error) {
        this.logger.error(`error:${JSON.stringify(error.message)}`)
        throw new RpcException(error.message)
      }
    }

   
}
