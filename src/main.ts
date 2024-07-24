import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://newuser:bitnami@localhost:5672/app_test'],
      noAck: false,
      queue: 'user-backend',
      queueOptions: {
        durable: true, 
      },
    },
  });

  app.listen()
    .then(() => logger.log('Microservice is listening'))
    .catch(err => logger.error('Error starting microservice', err));
}

bootstrap();
