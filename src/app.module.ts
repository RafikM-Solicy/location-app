import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'rafo443953',
      database: 'mydb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LocationsModule,
  ],
})
export class AppModule { }
