import { Controller, Post } from '@nestjs/common';
import { OfferDto } from 'src/dtos/offer.dto';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('process-offers')
  async processOffers(): Promise<OfferDto[]> {
    return this.offerService.processOffers();
  }
}
