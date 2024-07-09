// config.ts
import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    account1PublicKey: process.env.ACCOUNT1_PUBLIC_KEY || 'publicKey1',
    account2PublicKey: process.env.ACCOUNT2_PUBLIC_KEY || 'publicKey2',
    solanaApiEndpoint: process.env.SOLANA_API_ENDPOINT || 'https://api.mainnet-beta.solana.com'
};
