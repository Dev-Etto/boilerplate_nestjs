import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    // @ts-expect-error: 'beforeExit' is a valid event but not typed in PrismaClient
    this.$on('beforeExit', () => {
      void app.close();
    });
  }
}
