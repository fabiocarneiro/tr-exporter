import fs from 'fs';
import path from 'path';
import { EnrichedTransaction } from '@/domain/models';
import {
  mapTransactionsToPortfolioData,
  restampCorrectedDividends,
} from '@/domain/portfolio';
import { getPhoneNumber } from '@/adapters/cli/phoneNumberStorage';
import { consola } from 'consola';

export const loadTransactions = async (): Promise<{
  transactions: EnrichedTransaction[];
  phoneNumber: string;
} | null> => {
  const phoneNumber = getPhoneNumber();

  if (!phoneNumber) {
    consola.error('Error: Phone number not set.');
    consola.error('Please set your phone number first.');
    return null;
  }

  const transactionsPath = `build/${phoneNumber}/transactions.json`;
  if (!fs.existsSync(transactionsPath)) {
    consola.error(`Error: ${transactionsPath} not found.`);
    consola.error(
      'Please download transactions first using option 1 before converting.',
    );
    return null;
  }

  try {
    consola.info(`Reading transactions from ${transactionsPath}...`);
    const transactions = JSON.parse(fs.readFileSync(transactionsPath, 'utf8'));
    return { transactions, phoneNumber };
  } catch (error) {
    consola.error(`Error reading ${transactionsPath}:`, error);
    return null;
  }
};

export const handleConvertTransactionsToPortfolio = async (): Promise<void> => {
  try {
    const result = await loadTransactions();
    if (!result) return;

    const { transactions, phoneNumber } = result;

    consola.info('Converting transactions to portfolio data...');
    const restamped = await restampCorrectedDividends(
      transactions,
      phoneNumber,
    );
    const { portfolio, unsupported } =
      mapTransactionsToPortfolioData(restamped);

    const dir = path.join(process.cwd(), 'build', phoneNumber);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'portfolioData.json'),
      JSON.stringify(portfolio, null, 2),
    );

    if (unsupported.length > 0) {
      const unsupportedPath = path.join(dir, 'unsupportedTransactions.json');
      fs.writeFileSync(unsupportedPath, JSON.stringify(unsupported, null, 2));
      consola.warn(
        `${unsupported.length} unsupported transaction(s) written to ${unsupportedPath}. Please report this at https://github.com/DanielFerrariR/tr-exporter/issues`,
      );
    }

    consola.info('Portfolio data generated successfully.');
  } catch (error) {
    consola.error('Error converting transactions to portfolio data:', error);
  }
};
