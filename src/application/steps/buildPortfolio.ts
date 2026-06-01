import fs from 'fs';
import path from 'path';
import { EnrichedTransaction } from '@/domain/models';
import { mapTransactionsToPortfolioData } from '@/domain/portfolio/mapTransactionsToPortfolioData';

export const buildPortfolio =
  (phoneNumber: string) =>
  async (txs: EnrichedTransaction[]): Promise<EnrichedTransaction[]> => {
    console.log('Generating portfolio data...');
    const { portfolio, unsupported } = mapTransactionsToPortfolioData(txs);
    const dir = path.join(process.cwd(), 'build', phoneNumber);
    fs.mkdirSync(dir, { recursive: true });

    const portfolioPath = path.join(dir, 'portfolioData.json');
    fs.writeFileSync(portfolioPath, JSON.stringify(portfolio, null, 2));
    console.log(
      `File "portfolioData.json" successfully saved to ${portfolioPath}.`,
    );

    if (unsupported.length > 0) {
      const unsupportedPath = path.join(dir, 'unsupportedTransactions.json');
      fs.writeFileSync(unsupportedPath, JSON.stringify(unsupported, null, 2));
      console.warn(
        `${unsupported.length} unsupported transaction(s) written to ${unsupportedPath}. Please report this at https://github.com/DanielFerrariR/tr-exporter/issues`,
      );
    }

    return txs;
  };
