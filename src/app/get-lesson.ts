import Lesson, { ILesson } from '@domain/entities/lesson';
import { GoogleTranslateService } from '@infra/services/google-translate/google-translate.service';
import { ZenQuoteService } from '@infra/services/zen-quote/zen-quote.service';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from './use-case.interface';

@Injectable()
export class GetLesson implements UseCase<never, Promise<ILesson>> {
  constructor(
    @Inject(ZenQuoteService) private zenQuoteService: ZenQuoteService,
    @Inject(GoogleTranslateService)
    private readonly googleTranslateService: GoogleTranslateService,
  ) {}

  async execute(): Promise<ILesson> {
    const quote = await this.zenQuoteService.random();
    const quoteTranslated = await this.googleTranslateService.translate(
      quote.phrase,
    );

    return new Lesson({
      phrase: quote.phrase,
      author: quote.author,
      translate: quoteTranslated,
    });
  }
}
