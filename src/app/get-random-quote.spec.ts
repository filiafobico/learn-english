import { IQuote } from '@domain/entities/quote';
import { ZenQuoteService } from '@infra/services/zen-quote/zen-quote.service';
import { Test, TestingModule } from '@nestjs/testing';
import { GetRandomQuote } from './get-random-quote';

describe('GetRandomQuote', () => {
  let getRandomQuote: GetRandomQuote;
  let zenQuoteService: ZenQuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRandomQuote,
        ZenQuoteService,
        {
          provide: 'AXIOS',
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    getRandomQuote = module.get<GetRandomQuote>(GetRandomQuote);
    zenQuoteService = module.get<ZenQuoteService>(ZenQuoteService);
  });

  it('should be defined', () => {
    expect(getRandomQuote).toBeDefined();
  });

  it('should return a Quote', async () => {
    const result: IQuote = {
      author: 'Author Name',
      phrase: 'This is an Quote',
    };
    jest
      .spyOn(zenQuoteService, 'random')
      .mockImplementationOnce(async () => result);

    expect(await getRandomQuote.execute()).toEqual(result);
  });
});
