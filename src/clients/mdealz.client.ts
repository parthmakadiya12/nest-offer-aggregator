import { Injectable } from '@nestjs/common';
import { OfferDto } from 'src/dtos/offer.dto';
import { offer2Payload } from 'src/mock/offer2.payload';

@Injectable()
export class MDealzClient {
  // can create response Type for this but considering time using any
  async fetchOffers(): Promise<any> {
    return new Promise((res) => {
      setTimeout(() => res(offer2Payload), 1000);
    });
  }

  getClientName(): string {
    return 'mdealz';
  }

  transform(payload): OfferDto[] {
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
        };

        transformedOffers.push(transformedOffer);
      } catch (error) {
        console.error(`Error processing offer at key ${key}: ${error.message}`);
      }
    }

    return transformedOffers;
  }
}
