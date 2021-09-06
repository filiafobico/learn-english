import { Controller, Get } from '@nestjs/common';
import { GetRandomQuote } from '@app/get-random-quote';
import { IQuote } from '@domain/entities/quote';

@Controller('quote')
export class QuoteController {
  constructor(private readonly getRandomQuote: GetRandomQuote) {}

  @Get('random')
  random(): Promise<IQuote> {
    return this.getRandomQuote.execute();
  }
}
