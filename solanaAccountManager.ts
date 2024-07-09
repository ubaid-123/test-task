// solanaAccountManager.ts
import fetch from 'node-fetch';

interface Token {
    name: string;
    balance: number;
}

interface ComparisonResult {
    account1Only: Token[];
    account2Only: Token[];
    commonTokens: Token[];
}

type MockData = Record<string, Token[]>;

const mockData: MockData = {
    'publicKey1': [
        { name: 'TokenA', balance: 100 },
        { name: 'TokenB', balance: 200 }
    ],
    'publicKey2': [
        { name: 'TokenB', balance: 150 },
        { name: 'TokenC', balance: 300 }
    ]
};

export class SolanaAccountManager {
    private apiEndpoint: string;
    private data: MockData;

    constructor(apiEndpoint: string, data: MockData = mockData) {
        this.apiEndpoint = apiEndpoint;
        this.data = data;
    }

    /**
     * Fetch tokens for a given Solana public key.
     * @param publicKey - Solana public key.
     * @returns Promise<Token[]> - A promise that resolves to an array of tokens.
     */
    public async fetchTokens(publicKey: string): Promise<Token[]> {
        // In a real implementation, this would involve network calls and proper error handling
        return this.data[publicKey] || [];
    }

    /**
     * Compare token balances between two Solana accounts.
     * @param account1 - Public key of the first account.
     * @param account2 - Public key of the second account.
     * @returns Promise<ComparisonResult> - A promise that resolves to the comparison result.
     */
    public async compareBalances(account1: string, account2: string): Promise<ComparisonResult> {
        const [tokens1, tokens2] = await Promise.all([this.fetchTokens(account1), this.fetchTokens(account2)]);

        const tokens1Map = new Map(tokens1.map(token => [token.name, token]));
        const tokens2Map = new Map(tokens2.map(token => [token.name, token]));

        const account1Only: Token[] = [];
        const account2Only: Token[] = [];
        const commonTokens: Token[] = [];

        tokens1Map.forEach((token, name) => {
            if (tokens2Map.has(name)) {
                commonTokens.push({
                    name,
                    balance: token.balance + tokens2Map.get(name)!.balance
                });
            } else {
                account1Only.push(token);
            }
        });

        tokens2Map.forEach((token, name) => {
            if (!tokens1Map.has(name)) {
                account2Only.push(token);
            }
        });

        return { account1Only, account2Only, commonTokens };
    }
}
