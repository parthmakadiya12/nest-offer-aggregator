import { MDealzClient } from '../mdealz.client';
import { offer2Payload } from 'src/mock/offer2.payload';

describe('mdealz client test', () => {
  it('should return mdealz client name', () => {
    const client = new MDealzClient();
    expect(client.getClientName()).toEqual('mdealz');
  });
  it('should return mdealz client offers', async () => {
    const client = new MDealzClient();
    const result = await client.fetchOffers();
    // TODO: in real api call mock the axios call
    expect(result).toBe(offer2Payload);
  });
  it('should transform offer properly', async () => {
    const client = new MDealzClient();
    const result = await client.transform(offer2Payload);
    expect(result).toEqual([
      {
        description:
          'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
        externalOfferId: 15828,
        isAndroid: false,
        isDesktop: true,
        isIos: true,
        name: 'Sofi',
        offerUrlTemplate: 'https://some.url',
        requirements:
          'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
        thumbnail: 'https://some.url',
        providerName: 'mdealz',
        slug: '',
      },
    ]);
  });
});
