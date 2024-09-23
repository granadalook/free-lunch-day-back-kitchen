import { Module } from '@nestjs/common';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import { DatabaseModule } from './modules/database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            ssl: true,
            sasl: {
              mechanism: 'plain',
              password:
                'W7ioyLOGFtVX9rsHNO5t0xNpDOW6kSHJbEB1iHxjM5SOJamALqFnvvW1/P8nWfP4',
              username: 'SLTOY7I7LP5OB2VW',
            },
            brokers: ['pkc-4j8dq.southeastasia.azure.confluent.cloud:9092'],
          },
        },
      },
    ]),
    KitchenModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
