import { GoogleTranslateService } from '@infra/services/google-translate/google-translate.service';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from './use-case.interface';

@Injectable()
export class TranslatePhrase implements UseCase<string, Promise<string>> {
  constructor(
    @Inject(GoogleTranslateService)
    private readonly googleTranslateService: GoogleTranslateService,
  ) {}

  execute(phrase: string): Promise<string> {
    return this.googleTranslateService.translate(phrase);
  }
}
