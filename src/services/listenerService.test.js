import { getGame } from './gameService';
import {
    ListenerService,
    refreshGameForOpenedSockets,
    registerGameListener,
    unregisterGameListener,
} from './listenerService';

jest.mock('./gameService');

describe('Ws listeners tests', () => {
    test('Test unregisterGameListener empty', () => {
        let list = {};
        list = unregisterGameListener(list, 'anySocket', 10);

        expect(list).toEqual({});
    });

    test('Test registerGameListener first', () => {
        let list = {};
        list = registerGameListener(list, 'anySocket', 10);

        expect(list[10]).toEqual(['anySocket']);
    });

    test('Test registerGameListener fourth and one', () => {
        let list = {};
        list = registerGameListener(list, 'FirstSocket', 9);
        list = registerGameListener(list, 'SecondSocket', 9);
        list = registerGameListener(list, 'ThridSocket', 9);
        list = registerGameListener(list, 'SoloSocket', 11);
        list = registerGameListener(list, 'FourthSocket', 9);

        expect(list[9].length).toEqual(4);
        expect(list[11]).toEqual(['SoloSocket']);
    });

    test('Test unregisterGameListener not empty', () => {
        let list = {};
        list = registerGameListener(list, 'FirstSocket', 7);
        list = registerGameListener(list, 'SecondSocket', 7);
        list = registerGameListener(list, 'ThridSocket', 7);
        list = registerGameListener(list, 'SoloSocket', 14);
        list = registerGameListener(list, 'FourthSocket', 7);

        expect(list[7].length).toEqual(4);

        list = unregisterGameListener(list, 'ThridSocket', 7);

        expect(list[7].length).toEqual(3);
    });

    test('Test refreshGameForOpenedSockets', async () => {
        let list = {};
        getGame.mockImplementation(i => {
            return { idGame: i };
        });

        list = registerGameListener(
            list,
            { id: 'FirstSocket', emit: jest.fn() },
            17,
        );
        list = registerGameListener(
            list,
            { id: 'SecondSocket', emit: jest.fn() },
            17,
        );
        list = registerGameListener(
            list,
            { id: 'ThridSocket', emit: jest.fn() },
            17,
        );
        list = registerGameListener(
            list,
            { id: 'SoloSocket', emit: jest.fn() },
            114,
        );

        const nbEmit = await refreshGameForOpenedSockets(list, 17);

        expect(nbEmit).toEqual(3);

        const nbEmit2 = await refreshGameForOpenedSockets(list, 114);
        expect(nbEmit2).toEqual(1);

        const nbEmit3 = await refreshGameForOpenedSockets(list, 1814);
        expect(nbEmit3).toEqual(0);

        expect(getGame).toHaveBeenCalledWith(17);
        expect(getGame).toHaveBeenCalledWith(114);
    });

    test('Test factory unregisterGameListener empty', () => {
        const listenerService = new ListenerService({});
        listenerService.unregister('anySocket', 10);

        expect(listenerService.list).toEqual({});
    });

    test('Test factory registerGameListener first', () => {
        const listenerService = new ListenerService({});
        listenerService.register('anySocket', 10);

        expect(listenerService.list[10]).toEqual(['anySocket']);
    });

    test('Test factory registerGameListener fourth and one', () => {
        const listenerService = new ListenerService({});
        listenerService.register('FirstSocket', 9);
        listenerService.register('SecondSocket', 9);
        listenerService.register('ThridSocket', 9);
        listenerService.register('SoloSocket', 11);
        listenerService.register('FourthSocket', 9);

        expect(listenerService.list[9].length).toEqual(4);
        expect(listenerService.list[11]).toEqual(['SoloSocket']);
    });

    test('Test factory unregisterGameListener not empty', () => {
        const listenerService = new ListenerService({});
        listenerService.register('FirstSocket', 7);
        listenerService.register('SecondSocket', 7);
        listenerService.register('ThridSocket', 7);
        listenerService.register('SoloSocket', 14);
        listenerService.register('FourthSocket', 7);

        expect(listenerService.list[7].length).toEqual(4);

        listenerService.unregister('ThridSocket', 7);

        expect(listenerService.list[7].length).toEqual(3);
    });

    test('Test factory refreshGameForOpenedSockets', async () => {
        const listenerService = new ListenerService({});
        getGame.mockImplementation(i => {
            return { idGame: i };
        });

        listenerService.register({ id: 'FirstSocket', emit: jest.fn() }, 17);
        listenerService.register({ id: 'SecondSocket', emit: jest.fn() }, 17);
        listenerService.register({ id: 'ThridSocket', emit: jest.fn() }, 17);
        listenerService.register({ id: 'SoloSocket', emit: jest.fn() }, 114);

        const nbEmit = await listenerService.refreshGame(17);

        expect(nbEmit).toEqual(3);

        const nbEmit2 = await listenerService.refreshGame(114);
        expect(nbEmit2).toEqual(1);

        const nbEmit3 = await listenerService.refreshGame(1814);
        expect(nbEmit3).toEqual(0);

        expect(getGame).toHaveBeenCalledWith(17);
        expect(getGame).toHaveBeenCalledWith(114);
    });
});
