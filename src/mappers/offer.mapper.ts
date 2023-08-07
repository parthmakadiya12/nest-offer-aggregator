import { plainToClass } from 'class-transformer';
import { OfferDto } from 'src/dtos/offer.dto';
import { Offer } from 'src/entities/offer.entity';

export class OfferMapper {
  static toEntity(offerDto: OfferDto): Offer {
    return plainToClass(Offer, offerDto);
  }
}
