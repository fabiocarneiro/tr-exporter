import { OrderTransaction } from './transactions/OrderTransaction';
import { DividendTransaction } from './transactions/DividendTransaction';
import { CashTransaction } from './transactions/CashTransaction';
import { IsinChangeTransaction } from './transactions/IsinChangeTransaction';
import { StockSplitTransaction } from './transactions/StockSplitTransaction';
import { CapitalIncreaseTransaction } from './transactions/CapitalIncreaseTransaction';
import { CapitalReductionTransaction } from './transactions/CapitalReductionTransaction';
import { DividendNotificationTransaction } from './transactions/DividendNotificationTransaction';
import { DividendElectionTransaction } from './transactions/DividendElectionTransaction';
import { InformationalNoticeTransaction } from './transactions/InformationalNoticeTransaction';

export type Portfolio = (
  | OrderTransaction
  | DividendTransaction
  | CashTransaction
  | IsinChangeTransaction
  | StockSplitTransaction
  | CapitalIncreaseTransaction
  | CapitalReductionTransaction
  | DividendNotificationTransaction
  | DividendElectionTransaction
  | InformationalNoticeTransaction
)[];
