import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomNamingStrategy } from './util/db.naming';
import configuration from './config';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import { CacheModule } from './cache/cache.module';
import * as winston from 'winston';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [],
        synchronize: true,
        legacySpatialSupport: false,
        namingStrategy: new CustomNamingStrategy(),
        logging: configService.get('database.logging'),
        extra: {
          connectionLimit: configService.get<number>('database.connectionLimit'),
        }
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    WinstonModule.forRootAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          levels: {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3,
            verbose: 4,
          },
          level: configService.get('logger.level'),
          format: configService.get('logger.format'),
          transports: [
            new winston.transports.Console(),
          ]
        };
      },
    }),
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
