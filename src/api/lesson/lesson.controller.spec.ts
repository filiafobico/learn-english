import { GetLesson } from '@app/get-lesson';
import { ILesson } from '@domain/entities/lesson';
import { GoogleTranslateService } from '@infra/services/google-translate/google-translate.service';
import { ZenQuoteService } from '@infra/services/zen-quote/zen-quote.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LessonController } from './lesson.controller';

describe('LessonController', () => {
  let controller: LessonController;
  let getLesson: GetLesson;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonController],
      providers: [
        GetLesson,
        ZenQuoteService,
        GoogleTranslateService,
        {
          provide: 'AXIOS',
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: 'GOOGLE_TRANSLATE',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LessonController>(LessonController);
    getLesson = module.get<GetLesson>(GetLesson);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a Lesson', async () => {
    const lesson: ILesson = {
      author: 'Author Name',
      phrase: 'Phrase of quote',
      translate: 'Frase de citação',
    };

    jest.spyOn(getLesson, 'execute').mockImplementationOnce(async () => lesson);

    expect(await getLesson.execute()).toBe(lesson);
  });
});
