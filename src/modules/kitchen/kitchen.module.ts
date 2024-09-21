import { Module } from '@nestjs/common';
import { KitchenController } from './controller/kitchen.controller';
import { KitchenService } from './service/kitchen.service';
import { DatabaseService } from '../database/service/database.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          subscribe: {
            fromBeginning: true,
          },
          consumer: { groupId: 'kafka-test-kitchen' },
          client: {
            ssl: true,
            sasl: {
              mechanism: 'plain',
              password:
                'W7ioyLOGFtVX9rsHNO5t0xNpDOW6kSHJbEB1iHxjM5SOJamALqFnvvW1/P8nWfP4',
              username: 'SLTOY7I7LP5OB2VW',
            },
            brokers: ['pkc-4j8dq.southeastasia.azure.confluent.cloud:9092'],
            retry: {
              retries: 5,
              initialRetryTime: 1000,
              maxRetryTime: 30000,
            },
            connectionTimeout: 3000,
            authenticationTimeout: 10000,
          },
        },
      },
    ]),
  ],
  controllers: [KitchenController],
  providers: [KitchenService, DatabaseService],
})
export class KitchenModule {}
