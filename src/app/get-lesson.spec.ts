import { ILesson } from '@domain/entities/lesson';
import { IQuote } from '@domain/entities/quote';
import { GoogleTranslateService } from '@infra/services/google-translate/google-translate.service';
import { ZenQuoteService } from '@infra/services/zen-quote/zen-quote.service';
import { Test, TestingModule } from '@nestjs/testing';
import { GetLesson } from './get-lesson';

describe('GetLesson', () => {
  let getLesson: GetLesson;
  let zenQuoteService: ZenQuoteService;
  let googleTranslateService: GoogleTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetLesson,
        ZenQuoteService,
        {
          provide: 'AXIOS',
          useValue: {
            get: jest.fn(),
          },
        },
        GoogleTranslateService,
        {
          provide: 'GOOGLE_TRANSLATE',
          useValue: {},
        },
      ],
    }).compile();

    getLesson = module.get<GetLesson>(GetLesson);
    zenQuoteService = module.get<ZenQuoteService>(ZenQuoteService);
    googleTranslateService = module.get<GoogleTranslateService>(
      GoogleTranslateService,
    );
  });

  it('should be defined', () => {
    expect(getLesson).toBeDefined();
  });

  it('should return a Lesson', async () => {
    const quote: IQuote = {
      author: 'Author Name',
      phrase: 'Phrase of quote',
    };

    const translated = 'Frase de citação';

    const expected: ILesson = {
      author: 'Author Name',
      phrase: 'Phrase of quote',
      translate: 'Frase de citação',
    };

    jest
      .spyOn(zenQuoteService, 'random')
      .mockImplementationOnce(async () => quote);

    jest
      .spyOn(googleTranslateService, 'translate')
      .mockImplementationOnce(async () => translated);

    expect(await getLesson.execute()).toEqual(expected);
  });
});
