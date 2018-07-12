import {
    refreshGameForOpenedSockets,
    registerGameListener,
    unregisterGameListener,
} from './listenerService';

describe('Ws listeners tests', () => {
    test('Test unregisterGameListener empty', () => {
        const testList = unregisterGameListener('anySocket', 10);

        expect(testList).toEqual({});
    });

    test('Test registerGameListener first', () => {
        const testList = registerGameListener('anySocket', 10);

        expect(testList[10]).toEqual(['anySocket']);
    });

    test('Test registerGameListener fourth and one', () => {
        let testList = registerGameListener('FirstSocket', 9);
        testList = registerGameListener('SecondSocket', 9);
        testList = registerGameListener('ThridSocket', 9);
        testList = registerGameListener('SoloSocket', 11);
        testList = registerGameListener('FourthSocket', 9);

        expect(testList[9].length).toEqual(4);
        expect(testList[11]).toEqual(['SoloSocket']);
    });

    test('Test unregisterGameListener not empty', () => {
        let testList = registerGameListener('FirstSocket', 7);
        testList = registerGameListener('SecondSocket', 7);
        testList = registerGameListener('ThridSocket', 7);
        testList = registerGameListener('SoloSocket', 14);
        testList = registerGameListener('FourthSocket', 7);

        expect(testList[7].length).toEqual(4);

        const testList2 = unregisterGameListener('ThridSocket', 7);

        expect(testList2[7].length).toEqual(3);
    });

    test('Test refreshGameForOpenedSockets', async () => {
        registerGameListener({ id: 'FirstSocket', emit: jest.fn() }, 17);
        registerGameListener({ id: 'SecondSocket', emit: jest.fn() }, 17);
        registerGameListener({ id: 'ThridSocket', emit: jest.fn() }, 17);
        registerGameListener({ id: 'SoloSocket', emit: jest.fn() }, 114);

        const nbEmit = await refreshGameForOpenedSockets(17);
        expect(nbEmit).toEqual(3);

        const nbEmit2 = await refreshGameForOpenedSockets(114);
        expect(nbEmit2).toEqual(1);

        const nbEmit3 = await refreshGameForOpenedSockets(1814);
        expect(nbEmit3).toEqual(0);
    });
});
