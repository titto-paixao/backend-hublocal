import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './app/company/company.module';
import { LocalesModule } from './app/locales/locales.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(
          'DB_HOST',
          'containers-us-west-153.railway.app',
        ),
        port: Number(configService.get('DB_PORT', 7187)),
        username: configService.get('DB_USENAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '26aOjAtIUDXxn5FgsAFM'),
        database: configService.get('DB_DATABASE', 'railway'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    CompanyModule,
    LocalesModule,
  ],
})
export class AppModule {}
