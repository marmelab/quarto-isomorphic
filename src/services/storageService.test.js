import {
    storeGameToken,
    retrieveGameTokenList,
    retrieveGameToken,
} from './storageService';

describe('Storage for tokens tests', () => {
    let dataStored = {};
    const testStorage = {
        getItem: () => JSON.stringify(dataStored),
        setItem: (element, value) => {
            dataStored = JSON.parse(value);
        },
    };

    test('Test get empty tokens list', () => {
        dataStored = {};
        let list = {};
        list = retrieveGameTokenList(testStorage);

        expect(list).toEqual({});
    });

    test('Test get non empty tokens list', () => {
        dataStored = {};
        dataStored['11'] = 'tokenA';
        dataStored['12'] = 'tokenB';
        dataStored['13'] = 'tokenC';
        let list = {};
        list = retrieveGameTokenList(testStorage);

        expect(list).toEqual({ 11: 'tokenA', 12: 'tokenB', 13: 'tokenC' });
    });

    test('Test get token game 12', () => {
        dataStored = {};
        dataStored['11'] = 'tokenA';
        dataStored['12'] = 'tokenB';
        dataStored['13'] = 'tokenC';
        let list = {};
        list = retrieveGameToken(12, testStorage);

        expect(list).toEqual('tokenB');
    });

    test('Test get token game 14 undefined', () => {
        dataStored = {};
        dataStored['11'] = 'tokenA';
        dataStored['12'] = 'tokenB';
        dataStored['13'] = 'tokenC';
        let list = {};
        list = retrieveGameToken(14, testStorage);

        expect(list).toEqual(undefined);
    });

    test('Test set token new game 14', () => {
        dataStored = {};
        dataStored['11'] = 'tokenA';
        dataStored['12'] = 'tokenB';
        dataStored['13'] = 'tokenC';
        storeGameToken(14, 'tokenD', testStorage);

        expect(dataStored).toEqual({
            11: 'tokenA',
            12: 'tokenB',
            13: 'tokenC',
            14: 'tokenD',
        });
    });

    test('Test set token game 12', () => {
        dataStored = {};
        dataStored['11'] = 'tokenA';
        dataStored['12'] = 'tokenB';
        dataStored['13'] = 'tokenC';
        storeGameToken(12, 'tokenD', testStorage);

        expect(dataStored).toEqual({
            11: 'tokenA',
            12: 'tokenD',
            13: 'tokenC',
        });
    });

    test('Test set token game 12 empty list', () => {
        dataStored = {};
        storeGameToken(12, 'tokenD', testStorage);

        expect(dataStored).toEqual({
            12: 'tokenD',
        });
    });
});
