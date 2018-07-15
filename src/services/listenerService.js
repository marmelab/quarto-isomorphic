import { getGame } from './gameService';

export const refreshGameForOpenedSockets = async (
    gameListenersList,
    idGame,
) => {
    let emissionNumber = 0;
    if (gameListenersList[idGame]) {
        gameListenersList[idGame].forEach(async s => {
            let gameData = await getGame(idGame, s.token);
            s.socket.emit(`game${idGame}`, gameData.game);
            emissionNumber++;
        });
    }
    return emissionNumber;
};

export const registerGameListener = (
    gameListenersList,
    socket,
    idGame,
    token,
) => {
    return {
        ...gameListenersList,
        [idGame]: (gameListenersList[idGame] || []).concat({
            id: socket.id,
            token: token,
            socket,
        }),
    };
};

export const unregisterGameListener = (gameListenersList, idSocket, idGame) => {
    if (!gameListenersList[idGame]) {
        return gameListenersList;
    }
    const index = gameListenersList[idGame].findIndex(element => {
        return element.id == idSocket;
    });
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

    register = (socket, idGame, token) => {
        this.list = registerGameListener(this.list, socket, idGame, token);
    };
    unregister = (idSocket, idGame) => {
        this.list = unregisterGameListener(this.list, idSocket, idGame);
    };
    refreshGame = idGame => refreshGameForOpenedSockets(this.list, idGame);
}
