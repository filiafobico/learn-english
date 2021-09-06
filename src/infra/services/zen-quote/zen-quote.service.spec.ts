import { IQuote } from '@domain/entities/quote';
import { Test, TestingModule } from '@nestjs/testing';
import { ZenQuoteService } from './zen-quote.service';

describe('ZenQuoteService', () => {
  let zenQuoteService: ZenQuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZenQuoteService,
        {
          provide: 'AXIOS',
          useValue: {
            get: jest.fn(async () => ({
              data: [
                {
                  a: 'Author Name',
                  q: 'This is an Quote',
                },
              ],
            })),
          },
        },
      ],
    }).compile();

    zenQuoteService = module.get<ZenQuoteService>(ZenQuoteService);
  });

  it('should be defined', () => {
    expect(zenQuoteService).toBeDefined();
  });

  it('should return a Quote', async () => {
    const result: IQuote = {
      author: 'Author Name',
      phrase: 'This is an Quote',
    };

    expect(await zenQuoteService.random()).toEqual(result);
  });
});
