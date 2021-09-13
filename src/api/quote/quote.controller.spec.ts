import { GetRandomQuote } from '@app/get-random-quote';
import { TranslatePhrase } from '@app/translate-phrase';
import { IQuote } from '@domain/entities/quote';
import { GoogleTranslateService } from '@infra/services/google-translate/google-translate.service';
import { ZenQuoteService } from '@infra/services/zen-quote/zen-quote.service';
import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';

describe('QuoteController', () => {
  let quoteController: QuoteController;
  let getRandomQuote: GetRandomQuote;
  let translatePhrase: TranslatePhrase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        GetRandomQuote,
        TranslatePhrase,
        ZenQuoteService,
        GoogleTranslateService,
        {
          provide: 'AXIOS',
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: 'GOOGLE_TRANSLATE',
          useValue: {},
        },
      ],
    }).compile();

    getRandomQuote = module.get<GetRandomQuote>(GetRandomQuote);
    quoteController = module.get<QuoteController>(QuoteController);
    translatePhrase = module.get<TranslatePhrase>(TranslatePhrase);
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

  it('should translate a Phrase', async () => {
    const phrase = 'olá';
    const translated = 'hello';

    jest
      .spyOn(translatePhrase, 'execute')
      .mockImplementationOnce(async () => translated);

    expect(await quoteController.translate({ phrase })).toBe(translated);
  });
});
