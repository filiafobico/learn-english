import Lesson from './lesson';

describe('Lesson Entity', () => {
  it('should create a Lesson', () => {
    const lesson = new Lesson({
      author: 'Author Name',
      phrase: 'Phrase of quote',
      translate: 'Frase de citação',
    });

    expect(lesson).toBeInstanceOf(Lesson);
    expect(lesson.author).toBe('Author Name');
    expect(lesson.phrase).toBe('Phrase of quote');
    expect(lesson.translate).toBe('Frase de citação');
  });
});
