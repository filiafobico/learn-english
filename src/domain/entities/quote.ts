export interface IQuote {
  author: string;
  phrase: string;
}

export default class Quote implements IQuote {
  author: string;
  phrase: string;

  constructor(quote: IQuote) {
    this.author = quote.author;
    this.phrase = quote.phrase;
  }
}
