import { TRANSACTION_EVENT_TYPE } from '@/domain/constants';

export interface CapitalIncreaseTransaction {
  title: string;
  eventType: TRANSACTION_EVENT_TYPE.CAPITAL_INCREASE;
  date: string;
  isin: string;
  creditedShares: string;
}
