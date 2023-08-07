import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferController } from './offer/offer.controller';
import { OfferService } from './offer/offer.service';
import { ClientFactory } from './clients/client.factory';

@Module({
  imports: [],
  controllers: [AppController, OfferController],
  providers: [AppService, OfferService, ClientFactory],
})
export class AppModule {}
