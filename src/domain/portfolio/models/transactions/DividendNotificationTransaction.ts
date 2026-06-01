import { TRANSACTION_EVENT_TYPE } from '@/domain/constants';

export interface DividendNotificationTransaction {
  title: string;
  eventType: TRANSACTION_EVENT_TYPE.DIVIDEND_NOTIFICATION;
  date: string;
  isin: string;
}
