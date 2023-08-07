import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { OfferDto } from 'src/dtos/offer.dto';
import { ClientFactory } from 'src/clients/client.factory';

describe('OfferController', () => {
  let offerController: OfferController;
  let offerService: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [
        {
          provide: OfferService,
          useValue: {
            processOffers: jest.fn(),
          },
        },
        ClientFactory,
      ],
    }).compile();

    offerController = module.get<OfferController>(OfferController);
    offerService = module.get<OfferService>(OfferService);
  });

  describe('processOffers', () => {
    it('should call offerService.processOffers and return offers', async () => {
      const mockOffers: OfferDto[] = [
        {
          externalOfferId: '1',
          name: 'name',
          description: 'description',
          requirements: 'requirements',
          thumbnail: 'thumbnail',
          isDesktop: true,
          isAndroid: true,
          isIos: true,
          offerUrlTemplate: 'offerUrlTemplate',
        },
      ];

      offerService.processOffers = jest.fn().mockResolvedValue(mockOffers);

      const result = await offerController.processOffers();

      expect(offerService.processOffers).toHaveBeenCalled();
      expect(result).toEqual(mockOffers);
    });
  });
});
