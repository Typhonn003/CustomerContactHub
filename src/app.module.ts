import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './modules/customers/customers.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CustomersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
