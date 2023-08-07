import { Injectable } from '@nestjs/common';
import { OfferDto } from 'src/dtos/offer.dto';
import { offer1Payload } from 'src/mock/offer1.payload';

@Injectable()
export class DealzClient {
  // can create response Type for this but considering time using any
  async fetchOffers(): Promise<any> {
    return new Promise((res) => {
      setTimeout(() => res(offer1Payload), 1000);
    });
  }

  getClientName(): string {
    return 'dealz';
  }

  transform(payload: any): OfferDto[] {
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
        };

        transformedOffers.push(transformedOffer);
      } catch (error) {
        console.error(`Error processing offer: ${error.message}`);
      }
    }
    return transformedOffers;
  }
}
