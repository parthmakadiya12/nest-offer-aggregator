import { Injectable } from '@nestjs/common';
import { ClientFactory } from 'src/clients/client.factory';
import { OfferDto } from 'src/dtos/offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from 'src/entities/offer.entity';
import { OfferMapper } from 'src/mappers/offer.mapper';

@Injectable()
export class OfferService {
  constructor(
    private readonly clientFactory: ClientFactory,
    @InjectRepository(Offer) private readonly offerRepository: Repository<Offer>
  ) {}

  async processOffers(): Promise<OfferDto[]> {
    const clients = this.clientFactory.getAvailableClients();
    const results: OfferDto[] = [];

    for (let [clientName, client] of clients) {
      const payload = await client.fetchOffers();
      const transformedOffers = await client.transform(payload);

      for (const transformedOfferDto of transformedOffers) {
        const offerEntity = OfferMapper.toEntity(transformedOfferDto);
        await this.offerRepository.save(offerEntity);
        results.push(transformedOfferDto);
      }
    }

    return results;
  }
}
