import { TranslationServiceClient } from '@google-cloud/translate';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleTranslateService {
  private readonly projectId = 'quote-in-english';

  constructor(
    @Inject('GOOGLE_TRANSLATE')
    private readonly googleTranslate: TranslationServiceClient,
  ) {}

  async translate(phrase: string): Promise<string> {
    const request = {
      parent: `projects/${this.projectId}/locations/global`,
      contents: [phrase],
      mimeType: 'text/plain',
      sourceLanguageCode: 'en',
      targetLanguageCode: 'pt-br',
    };

    const [
      {
        translations: [{ translatedText }],
      },
    ] = await this.googleTranslate.translateText(request);

    return translatedText;
  }
}
