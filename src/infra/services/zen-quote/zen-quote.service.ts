import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IQuote } from '@domain/entities/quote';
import { ZenQuoteConstants } from '@infra/constants/zen-quote.constants';
import { QuoteService } from '@app/services/quote-service.interface';

interface IZenQuote {
  q: string;
  a: string;
  h: string;
}

@Injectable()
export class ZenQuoteService implements QuoteService {
  private endpoint: string = ZenQuoteConstants.API_BASE_URL;

  constructor(@Inject('AXIOS') private axios: AxiosInstance) {}

  async random(): Promise<IQuote> {
    const {
      data: [quote],
    } = await this.axios.get(this.endpoint + '/random');
    return this.mapZenQuoteToIQuote(quote);
  }

  private mapZenQuoteToIQuote(zenQuote: IZenQuote): IQuote {
    return {
      author: zenQuote.a,
      phrase: zenQuote.q,
    };
  }
}
