import { Module } from '@nestjs/common';
import { ZenQuoteService } from './infra/services/zen-quote/zen-quote.service';
import { QuoteController } from './api/quote/quote.controller';
import { GetRandomQuote } from './app/get-random-quote';
import { GoogleTranslateService } from './infra/services/google-translate/google-translate.service';
import axios from 'axios';
import { TranslationServiceClient } from '@google-cloud/translate';

@Module({
  imports: [],
  controllers: [QuoteController],
  providers: [
    ZenQuoteService,
    GetRandomQuote,
    {
      provide: 'AXIOS',
      useValue: axios,
    },
    {
      provide: 'GOOGLE_TRANSLATE',
      useValue: new TranslationServiceClient(),
    },
    GoogleTranslateService,
  ],
})
export class AppModule {}
