import { getGame } from './gameService';

const gameListenersList = {};

export const refreshGameForOpenedSockets = async idGame => {
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

export const registerGameListener = (socket, idGame) => {
    if (!gameListenersList[idGame]) gameListenersList[idGame] = [];
    gameListenersList[idGame].push(socket);
    return gameListenersList;
};

export const unregisterGameListener = (socket, idGame) => {
    if (gameListenersList[idGame]) {
        let index = gameListenersList[idGame].indexOf(socket);
        if (index > -1) {
            gameListenersList[idGame].splice(index, 1);
        }
    }
    return gameListenersList;
};
