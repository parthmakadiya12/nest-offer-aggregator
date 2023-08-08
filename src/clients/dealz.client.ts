import { Injectable } from '@nestjs/common';
import { OfferDto } from 'src/dtos/offer.dto';
import { offer1Payload } from 'src/mock/offer1.payload';
import { IClient } from './Iclient.interface';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

@Injectable()
export class DealzClient implements IClient {
  // can create response Type for this but considering time using any
  async fetchOffers(): Promise<any> {
    return new Promise((res) => {
      setTimeout(() => res(offer1Payload), 1000);
    });
  }

  getClientName(): string {
    return 'dealz';
  }

  async transform(payload: any): Promise<OfferDto[]> {
    const { response } = payload;
    const transformedOffers: OfferDto[] = [];

    for (const offer of response.offers) {
      try {
        const transformedOffer: OfferDto = {
          externalOfferId: offer.offer_id,
          name: offer.offer_name,
          description: offer.offer_desc,
          requirements: offer.call_to_action,
          thumbnail: offer.image_url,
          isDesktop: offer.platform === 'desktop',
          isAndroid: offer.device !== 'iphone_ipad',
          isIos: offer.device === 'iphone_ipad',
          offerUrlTemplate: offer.offer_url,
          providerName: this.getClientName(),
          slug: randomUUID(),
        };
        const newTransformedOffer = plainToClass(OfferDto, transformedOffer);
        await validateOrReject(newTransformedOffer);
        transformedOffers.push(transformedOffer);
      } catch (error) {
        console.error(`Error processing offer: ${error.message}`);
      }
    }
    return transformedOffers;
  }
}
