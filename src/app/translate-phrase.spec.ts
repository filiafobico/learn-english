import { GoogleTranslateService } from '@infra/services/google-translate/google-translate.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TranslatePhrase } from './translate-phrase';

describe('TranslatePhrase', () => {
  let translatePhrase: TranslatePhrase;
  let googleTranslateService: GoogleTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranslatePhrase,
        GoogleTranslateService,
        {
          provide: 'GOOGLE_TRANSLATE',
          useValue: {},
        },
      ],
    }).compile();

    translatePhrase = module.get<TranslatePhrase>(TranslatePhrase);
    googleTranslateService = module.get<GoogleTranslateService>(
      GoogleTranslateService,
    );
  });

  it('should be defined', () => {
    expect(translatePhrase).toBeDefined();
  });

  it('should translate a Phrase', async () => {
    const phrase = 'olá';
    const translated = 'hello';

    jest
      .spyOn(googleTranslateService, 'translate')
      .mockImplementationOnce(async () => translated);

    expect(await googleTranslateService.translate(phrase)).toEqual(translated);
  });
});
