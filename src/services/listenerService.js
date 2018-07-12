import { getGame } from './gameService';

const gameListenersList = {};

export const refreshGameForOpenedSockets = async idGame => {
    if (gameListenersList[idGame]) {
        const game = await getGame(idGame);
        gameListenersList[idGame].forEach(s => {
            s.emit(`game${idGame}`, game);
        });
    }
};

export const registerGameListener = (socket, idGame) => {
    if (!gameListenersList[idGame]) gameListenersList[idGame] = [];
    gameListenersList[idGame].push(socket);
};

export const unregisterGameListener = (socket, idGame) => {
    if (gameListenersList[idGame]) {
        let index = gameListenersList[idGame].indexOf(socket);
        if (index > -1) {
            gameListenersList[idGame].splice(index, 1);
        }
    }
};
