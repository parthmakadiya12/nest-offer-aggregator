import { IsBoolean, IsNumberString, IsString, IsUrl } from 'class-validator';

export class OfferDto {
  externalOfferId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  isDesktop: boolean;

  @IsBoolean()
  isAndroid: boolean;

  @IsBoolean()
  isIos: boolean;

  @IsUrl()
  offerUrlTemplate: string;

  @IsString()
  providerName: string;

  @IsString()
  slug: string;
}
