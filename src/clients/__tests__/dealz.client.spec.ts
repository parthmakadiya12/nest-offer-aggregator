import { offer1Payload } from 'src/mock/offer1.payload';
import { DealzClient } from '../dealz.client';

describe('dealz client test', () => {
  it('should return dealz client name', () => {
    const dealzClient = new DealzClient();
    expect(dealzClient.getClientName()).toEqual('dealz');
  });
  it('should return dealz client offers', async () => {
    const dealzClient = new DealzClient();
    const result = await dealzClient.fetchOffers();
    // TODO: in real api call mock the axios call
    expect(result).toBe(offer1Payload);
  });
  it('should transform offer properly', async () => {
    const dealzClient = new DealzClient();
    const result = await dealzClient.transform(offer1Payload);
    expect(result).toEqual([
      {
        description: 'Play and reach level 23 within 14 days.',
        externalOfferId: '19524555',
        isAndroid: false,
        isDesktop: false,
        isIos: true,
        name: 'MyGym - iOS',
        offerUrlTemplate: 'https://some.url',
        requirements: 'Play and reach level 23 within 14 days.',
        thumbnail: 'https://some.url',
      },
    ]);
  });
});
