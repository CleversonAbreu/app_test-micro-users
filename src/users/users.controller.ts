import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';


const ackErrors: string [] = ['E11000']

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly appService: UsersService) {}

  logger = new Logger(UsersController.name)

  @EventPattern('create-user')
  async createUsers(  
    @Payload() user:User,@Ctx() context:RmqContext
  ){
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    this.logger.log(`user:${JSON.stringify(user)}`)
    try {
        await this.appService.createUser(user)
        await channel.ack(originalMessage)
    } catch (error) {
        this.logger.error(`error: ${JSON.stringify(error.message)}`)
        ackErrors.map(async (ackError: any) =>{
          if(error.message.includes(ackError)){
            await channel.ack(originalMessage)
            return
          }
          await channel.nack(originalMessage)
        })
    }
  }

}
