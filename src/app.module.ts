import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksModule } from './products/books/books.module';
import { GroceryModule } from './products/groceies/grocery.module';
import { FruitsModule } from './products/fruits/fruits.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './users/admin/admin.module';
import { BuyerModule } from './users/buyer/buyer.module';
import { EmployeeModule } from './users/employee/employee.module';
import { SellerModule } from './users/seller/seller.module';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.SESSION_POOLER_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    MailerModule.forRoot({
      transport:{
        service:'gmail',
        auth:{
          user:process.env.FROM_EMAIL,
          pass:process.env.APP_PASSWORD
        },
      },
    }),
    
    //BooksModule,
    //GroceryModule,
    //FruitsModule,

    AdminModule,
    BuyerModule,
    EmployeeModule,
    SellerModule

  ],
  // controllers: [AppController],
  //providers: [AppService],
})
export class AppModule { }
