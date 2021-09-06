import Quote from './quote';

describe('Quote Entity', () => {
  it('should create a Quote', () => {
    const quote = new Quote({
      author: 'Author Name',
      phrase: 'Phrase of quote',
    });

    expect(quote).toBeInstanceOf(Quote);
    expect(quote.author).toBe('Author Name');
    expect(quote.phrase).toBe('Phrase of quote');
  });
});
