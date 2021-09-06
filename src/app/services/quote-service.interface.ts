import { IQuote } from '@domain/entities/quote';

export interface QuoteService {
  random(): Promise<IQuote>;
}
