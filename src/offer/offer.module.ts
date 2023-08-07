import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { ClientFactory } from 'src/clients/client.factory';
import { OfferService } from './offer.service';
import { Offer } from 'src/entities/offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OfferController],
  providers: [OfferService, ClientFactory],
})
export class OfferModule {}
