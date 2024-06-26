import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { NATS_SERVICE, envs } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';
@Module({
  // imports:[
  //   ClientsModule.register([
  //     { 
  //       name: NATS_SERVICE, 
  //       transport: Transport.NATS,
  //       options: {
  //         servers: envs.nats_servers
  //       } 
  //     },
  //   ]),
  // ],
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class ProductsModule {}
