import { TRANSACTION_EVENT_TYPE } from '@/domain/constants';

export interface DividendElectionTransaction {
  title: string;
  eventType: TRANSACTION_EVENT_TYPE.DIVIDEND_ELECTION;
  date: string;
  isin: string;
}
