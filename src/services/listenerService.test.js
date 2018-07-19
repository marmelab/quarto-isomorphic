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
        list = unregisterGameListener(list, '123', 10);

        expect(list).toEqual({});
    });

    test('Test registerGameListener first', () => {
        let list = {};
        list = registerGameListener(list, { id: '123' }, 10);

        expect(list[10][0].id).toEqual('123');
    });

    test('Test registerGameListener fourth and one', () => {
        let list = {};
        list = registerGameListener(list, { id: '123' }, 9);
        list = registerGameListener(list, { id: '124' }, 9);
        list = registerGameListener(list, { id: '125' }, 9);
        list = registerGameListener(list, { id: '126' }, 11);
        list = registerGameListener(list, { id: '127' }, 9);

        expect(list[9].length).toEqual(4);
        expect(list[11][0].id).toEqual('126');
    });

    test('Test unregisterGameListener not empty', () => {
        let list = {};
        list = registerGameListener(list, { id: '123' }, 7);
        list = registerGameListener(list, { id: '124' }, 7);
        list = registerGameListener(list, { id: '125' }, 7);
        list = registerGameListener(list, { id: '126' }, 14);
        list = registerGameListener(list, { id: '127' }, 7);

        expect(list[7].length).toEqual(4);

        list = unregisterGameListener(list, '125', 7);

        expect(list[7].length).toEqual(3);
    });

    test('Test refreshGameForOpenedSockets', async () => {
        let list = {};
        getGame.mockImplementation((i, t) => {
            return { idGame: i, token: t };
        });
        getGame.mockClear();

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

        await refreshGameForOpenedSockets(list, 17);
        expect(getGame).toHaveBeenCalledTimes(3);

        await refreshGameForOpenedSockets(list, 114);
        expect(getGame).toHaveBeenCalledTimes(4);

        await refreshGameForOpenedSockets(list, 1814);
        expect(getGame).toHaveBeenCalledTimes(4);

        expect(getGame).toHaveBeenCalledWith(17, undefined);
        expect(getGame).toHaveBeenCalledWith(114, undefined);
    });

    test('Test factory unregisterGameListener empty', () => {
        const listenerService = new ListenerService({});
        listenerService.unregister('127', 10);

        expect(listenerService.list).toEqual({});
    });

    test('Test factory registerGameListener first', () => {
        const listenerService = new ListenerService({});
        listenerService.register({ id: '127' }, 10);

        expect(listenerService.list[10][0].id).toEqual('127');
    });

    test('Test factory registerGameListener fourth and one', () => {
        const listenerService = new ListenerService({});
        listenerService.register({ id: '234' }, 9);
        listenerService.register({ id: '235' }, 9);
        listenerService.register({ id: '236' }, 9);
        listenerService.register({ id: '237' }, 11);
        listenerService.register({ id: '238' }, 9);

        expect(listenerService.list[9].length).toEqual(4);
        expect(listenerService.list[11][0].id).toEqual('237');
    });

    test('Test factory unregisterGameListener not empty', () => {
        const listenerService = new ListenerService({});
        listenerService.register({ id: '234' }, 7);
        listenerService.register({ id: '235' }, 7);
        listenerService.register({ id: '236' }, 7);
        listenerService.register({ id: '237' }, 14);
        listenerService.register({ id: '238' }, 7);

        expect(listenerService.list[7].length).toEqual(4);

        listenerService.unregister('236', 7);

        expect(listenerService.list[7].length).toEqual(3);
    });

    test('Test factory refreshGameForOpenedSockets', async () => {
        const listenerService = new ListenerService({});
        getGame.mockImplementation(i => {
            return { idGame: i };
        });
        getGame.mockClear();

        listenerService.register({ id: '234', emit: jest.fn() }, 17);
        listenerService.register({ id: '235', emit: jest.fn() }, 17);
        listenerService.register({ id: '236', emit: jest.fn() }, 17);
        listenerService.register({ id: '238', emit: jest.fn() }, 114);

        await listenerService.refreshGame(17);
        expect(getGame).toHaveBeenCalledTimes(3);

        await listenerService.refreshGame(114);
        expect(getGame).toHaveBeenCalledTimes(4);

        await listenerService.refreshGame(1814);
        expect(getGame).toHaveBeenCalledTimes(4);

        expect(getGame).toHaveBeenCalledWith(17, undefined);
        expect(getGame).toHaveBeenCalledWith(114, undefined);
    });
});
