"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// solanaAccountManager.test.ts
const solanaAccountManager_1 = require("../solanaAccountManager");
describe('SolanaAccountManager', () => {
    let manager;
    beforeEach(() => {
        manager = new solanaAccountManager_1.SolanaAccountManager('mockApiEndpoint');
    });
    test('fetchTokens returns correct tokens for publicKey1', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokens = yield manager.fetchTokens('publicKey1');
        expect(tokens).toEqual([
            { name: 'TokenA', balance: 100 },
            { name: 'TokenB', balance: 200 }
        ]);
    }));
    test('fetchTokens returns correct tokens for publicKey2', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokens = yield manager.fetchTokens('publicKey2');
        expect(tokens).toEqual([
            { name: 'TokenB', balance: 150 },
            { name: 'TokenC', balance: 300 }
        ]);
    }));
    test('compareBalances returns correct comparison result', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield manager.compareBalances('publicKey1', 'publicKey2');
        expect(result.account1Only).toEqual([
            { name: 'TokenA', balance: 100 }
        ]);
        expect(result.account2Only).toEqual([
            { name: 'TokenC', balance: 300 }
        ]);
        expect(result.commonTokens).toEqual([
            { name: 'TokenB', balance: 350 }
        ]);
    }));
});
