import { getGame } from './gameService';

export const refreshGameForOpenedSockets = async (
    gameListenersList,
    idGame,
) => {
    let emissionNumber = 0;
    if (gameListenersList[idGame]) {
        const game = await getGame(idGame);
        gameListenersList[idGame].forEach(s => {
            s.emit(`game${idGame}`, game);
            emissionNumber++;
        });
    }
    return emissionNumber;
};

export const registerGameListener = (gameListenersList, socket, idGame) => {
    return {
        ...gameListenersList,
        [idGame]: (gameListenersList[idGame] || []).concat(socket),
    };
};

export const unregisterGameListener = (gameListenersList, socket, idGame) => {
    if (!gameListenersList[idGame]) {
        return gameListenersList;
    }
    const index = gameListenersList[idGame].indexOf(socket);
    if (index < 0) {
        return gameListenersList;
    }

    return {
        ...gameListenersList,
        [idGame]: [
            ...gameListenersList[idGame].slice(0, index),
            ...gameListenersList[idGame].slice(index + 1),
        ],
    };
};

export class ListenerService {
    list = {};

    constructor(list) {
        this.list = list;
    }

    register = (socket, idGame) => {
        this.list = registerGameListener(this.list, socket, idGame);
    };
    unregister = (socket, idGame) => {
        this.list = unregisterGameListener(this.list, socket, idGame);
    };
    refreshGame = idGame => refreshGameForOpenedSockets(this.list, idGame);
}
