import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const clientProxyFactory = ClientProxyFactory.create({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'client',
    },
  },
});
