import { Injectable } from '@nestjs/common';
import { OfferDto } from 'src/dtos/offer.dto';
import { offer2Payload } from 'src/mock/offer2.payload';
import { IClient } from './Iclient.interface';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

@Injectable()
export class MDealzClient implements IClient {
  // can create response Type for this but considering time using any
  async fetchOffers(): Promise<any> {
    return new Promise((res) => {
      setTimeout(() => res(offer2Payload), 1000);
    });
  }

  getClientName(): string {
    return 'mdealz';
  }

  async transform(payload): Promise<OfferDto[]> {
    const { data } = payload;
    const transformedOffers: OfferDto[] = [];

    for (const key of Object.keys(data)) {
      try {
        const offer = data[key].Offer;
        const os = data[key].OS;

        const transformedOffer: OfferDto = {
          externalOfferId: offer.campaign_id,
          name: offer.name,
          description: offer.description,
          requirements: offer.instructions,
          thumbnail: offer.icon,
          isDesktop: os.web,
          isAndroid: os.android,
          isIos: os.ios,
          offerUrlTemplate: offer.tracking_url,
          providerName: this.getClientName(),
          slug: randomUUID(),
        };
        const newTransformedOffer = plainToClass(OfferDto, transformedOffer);
        await validateOrReject(newTransformedOffer);
        transformedOffers.push(transformedOffer);
      } catch (error) {
        console.error(`Error processing offer at key ${key}: ${error}`);
      }
    }

    return transformedOffers;
  }
}
