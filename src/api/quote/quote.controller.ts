import { GetRandomQuote } from '@app/get-random-quote';
import { TranslatePhrase } from '@app/translate-phrase';
import { IQuote } from '@domain/entities/quote';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('quote')
export class QuoteController {
  constructor(
    private readonly getRandomQuote: GetRandomQuote,
    private readonly translatePhrase: TranslatePhrase,
  ) {}

  @Get('random')
  random(): Promise<IQuote> {
    return this.getRandomQuote.execute();
  }

  @Get('translate')
  translate(@Query() query: { phrase: string }): Promise<string> {
    return this.translatePhrase.execute(query.phrase);
  }
}
