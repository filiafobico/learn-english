import { IQuote } from '@domain/entities/quote';
import { ZenQuoteService } from '@infra/services/zen-quote/zen-quote.service';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@app/use-case.interface';

@Injectable()
export class GetRandomQuote implements UseCase<void, Promise<IQuote>> {
  constructor(
    @Inject(ZenQuoteService) private zenQuoteService: ZenQuoteService,
  ) {}

  execute(): Promise<IQuote> {
    return this.zenQuoteService.random();
  }
}
