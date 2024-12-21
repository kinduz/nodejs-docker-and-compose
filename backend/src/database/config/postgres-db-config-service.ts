import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Injectable()
export class PostgresDbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(
      this.configService.get('POSTGRES_USER'),
      this.configService.get('POSTGRES_PASSWORD'),
      this.configService.get('POSTGRES_HOST'),
      this.configService.get('POSTGRES_DB'),
    );

    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: +this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DB'),
      entities: [User, Wish, Wishlist, Offer],
      migrations: [`${__dirname}/**/database/migrations/**/*{.ts,.js}`],
      synchronize: true,
    };
  }
}
