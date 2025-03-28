import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/entities/user.entity";

@Module({
  imports: [UsersModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',       // Или 'service-db' (если Nest в Docker)
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',    // <- Имя БД из create_db.sql!
    entities: [User],       // Или [__dirname + '/**/*.entity{.ts,.js}']
    synchronize: true,       // true = TypeORM сам создаст таблицы (если БД пустая)
    logging: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
