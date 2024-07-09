// compareBalances.ts
import { SolanaAccountManager } from './solanaAccountManager';
import { config } from './config';
import { logger } from './logger';

async function main() {
    const { account1PublicKey, account2PublicKey, solanaApiEndpoint } = config;
    const manager = new SolanaAccountManager(solanaApiEndpoint);

    try {
        const result = await manager.compareBalances(account1PublicKey, account2PublicKey);

        logger.info('Tokens only in account 1:', { tokens: result.account1Only });
        logger.info('Tokens only in account 2:', { tokens: result.account2Only });
        logger.info('Common tokens:', { tokens: result.commonTokens });
    } catch (error) {
        logger.error('Error comparing balances:', { error });
    }
}

main().catch(error => logger.error('Unhandled error:', { error }));
