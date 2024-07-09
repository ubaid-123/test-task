// solanaAccountManager.test.ts
import { SolanaAccountManager } from '../solanaAccountManager';

describe('SolanaAccountManager', () => {
    let manager: SolanaAccountManager;

    beforeEach(() => {
        manager = new SolanaAccountManager('mockApiEndpoint');
    });

    test('fetchTokens returns correct tokens for publicKey1', async () => {
        const tokens = await manager.fetchTokens('publicKey1');
        expect(tokens).toEqual([
            { name: 'TokenA', balance: 100 },
            { name: 'TokenB', balance: 200 }
        ]);
    });

    test('fetchTokens returns correct tokens for publicKey2', async () => {
        const tokens = await manager.fetchTokens('publicKey2');
        expect(tokens).toEqual([
            { name: 'TokenB', balance: 150 },
            { name: 'TokenC', balance: 300 }
        ]);
    });

    test('compareBalances returns correct comparison result', async () => {
        const result = await manager.compareBalances('publicKey1', 'publicKey2');

        expect(result.account1Only).toEqual([
            { name: 'TokenA', balance: 100 }
        ]);
        expect(result.account2Only).toEqual([
            { name: 'TokenC', balance: 300 }
        ]);
        expect(result.commonTokens).toEqual([
            { name: 'TokenB', balance: 350 }
        ]);
    });
});
