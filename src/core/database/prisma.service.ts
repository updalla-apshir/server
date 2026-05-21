import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '../config/config.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    super({
      adapter: new PrismaPg({
        connectionString: configService.database.url,
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
