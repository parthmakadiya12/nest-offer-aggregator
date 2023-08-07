import { OfferDto } from 'src/dtos/offer.dto';

export interface IClient {
  fetchOffers(): Promise<any>;
  getClientName(): string;
  transform(payload: any): Promise<OfferDto[]>;
}
