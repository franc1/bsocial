import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const kafkaHost = process.env.kafkaHost;
const kafkaPort = process.env.kafkaPort;

export const clientProxyFactory = ClientProxyFactory.create({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [`${kafkaHost}:${kafkaPort}`],
    },
    consumer: {
      groupId: 'client',
    },
  },
});
