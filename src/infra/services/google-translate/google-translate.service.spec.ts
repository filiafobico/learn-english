import { TranslationServiceClient } from '@google-cloud/translate';
import { Test, TestingModule } from '@nestjs/testing';
import { GoogleTranslateService } from './google-translate.service';

describe('GoogleTranslateService', () => {
  let service: GoogleTranslateService;
  let googleTranslate: TranslationServiceClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleTranslateService,
        {
          provide: 'GOOGLE_TRANSLATE',
          useValue: {
            translateText: jest.fn(async () => [
              {
                translations: [{ translatedText: 'translatedText' }],
              },
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<GoogleTranslateService>(GoogleTranslateService);
    googleTranslate = module.get<TranslationServiceClient>('GOOGLE_TRANSLATE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should translate a Phrase', async () => {
    const phrase = 'olá';

    expect(await service.translate(phrase)).toBe('translatedText');
  });

  it('should call sdk with right params', async () => {
    const phrase = 'olá';

    await service.translate(phrase);

    expect(googleTranslate.translateText).toBeCalledWith({
      contents: ['olá'],
      mimeType: 'text/plain',
      parent: 'projects/quote-in-english/locations/global',
      sourceLanguageCode: 'en',
      targetLanguageCode: 'pt-br',
    });
  });
});
