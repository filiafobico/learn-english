import { GetRandomQuote } from '@app/get-random-quote';
import { IQuote } from '@domain/entities/quote';
import { ZenQuoteService } from '@infra/services/zen-quote/zen-quote.service';
import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';

describe('QuoteController', () => {
  let quoteController: QuoteController;
  let getRandomQuote: GetRandomQuote;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
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
    quoteController = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(quoteController).toBeDefined();
  });

  it('should return a Quote', async () => {
    const result: IQuote = {
      author: 'Author Name',
      phrase: 'This is an Quote',
    };
    jest
      .spyOn(getRandomQuote, 'execute')
      .mockImplementationOnce(async () => result);

    expect(await quoteController.random()).toBe(result);
  });
});
