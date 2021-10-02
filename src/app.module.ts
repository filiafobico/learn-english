import { Module } from '@nestjs/common';
import { ZenQuoteService } from './infra/services/zen-quote/zen-quote.service';
import { GoogleTranslateService } from './infra/services/google-translate/google-translate.service';
import axios from 'axios';
import { TranslationServiceClient } from '@google-cloud/translate';
import { GetLesson } from './app/get-lesson';
import { LessonController } from './api/lesson/lesson.controller';

@Module({
  imports: [],
  controllers: [LessonController],
  providers: [
    ZenQuoteService,
    {
      provide: 'AXIOS',
      useValue: axios,
    },
    {
      provide: 'GOOGLE_TRANSLATE',
      useValue: new TranslationServiceClient(),
    },
    GoogleTranslateService,
    GetLesson,
  ],
})
export class AppModule {}
