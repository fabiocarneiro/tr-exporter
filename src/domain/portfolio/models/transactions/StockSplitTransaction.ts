import { TRANSACTION_EVENT_TYPE } from '@/domain/constants';

export interface StockSplitTransaction {
  title: string;
  eventType: TRANSACTION_EVENT_TYPE.STOCK_SPLIT;
  date: string;
  isin: string;
  creditedShares: string;
  debitedShares: string;
}
