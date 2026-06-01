import { TRANSACTION_EVENT_TYPE } from '@/domain/constants';

export interface CapitalReductionTransaction {
  title: string;
  eventType: TRANSACTION_EVENT_TYPE.CAPITAL_REDUCTION;
  date: string;
  isin: string;
  debitedShares: string;
}
