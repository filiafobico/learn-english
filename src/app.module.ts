import { Module } from '@nestjs/common';
import { ZenQuoteService } from './infra/services/zen-quote/zen-quote.service';
import { QuoteController } from './api/quote/quote.controller';
import { GetRandomQuote } from './app/get-random-quote';
import axios from 'axios';

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
  ],
})
export class AppModule {}
