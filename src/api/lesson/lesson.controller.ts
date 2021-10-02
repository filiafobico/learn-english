import { GetLesson } from '@app/get-lesson';
import { ILesson } from '@domain/entities/lesson';
import { Controller, Get } from '@nestjs/common';

@Controller('lesson')
export class LessonController {
  constructor(private readonly getLesson: GetLesson) {}

  @Get()
  lesson(): Promise<ILesson> {
    return this.getLesson.execute();
  }
}
