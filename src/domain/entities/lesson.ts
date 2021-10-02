export interface ILesson {
  author: string;
  phrase: string;
  translate: string;
}

export default class Lesson implements ILesson {
  author: string;
  phrase: string;
  translate: string;

  constructor(lesson: ILesson) {
    this.author = lesson.author;
    this.phrase = lesson.phrase;
    this.translate = lesson.translate;
  }
}
