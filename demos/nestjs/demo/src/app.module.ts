import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ProxyModule],
})
export class AppModule {}
