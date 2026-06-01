import { TRANSACTION_EVENT_TYPE } from '@/domain/constants';

export interface InformationalNoticeTransaction {
  title: string;
  eventType: TRANSACTION_EVENT_TYPE.INFORMATIONAL_NOTICE;
  date: string;
  isin: string;
}
