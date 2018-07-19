import { logStorageError } from './warningService';

const prefixStorage = '@Quarto:';
const tokenStorage = `${prefixStorage}gameTokens`;

export const storeGameToken = (idGame, token, gameStorage = localStorage) => {
    try {
        const tokenList = generateStorageTokens(idGame, token, gameStorage);
        gameStorage.setItem(tokenStorage, JSON.stringify(tokenList));
    } catch (error) {
        logStorageError(error, 'Data cannot be saved in device');
    }
};

export const retrieveGameTokenList = (gameStorage = localStorage) => {
    try {
        const value = gameStorage.getItem(tokenStorage);
        if (value !== null) {
            return JSON.parse(value);
        }
        return {};
    } catch (error) {
        logStorageError(error, 'Data cannot be read in device');
    }
};

export const retrieveGameToken = (idGame, gameStorage = localStorage) => {
    const tokenList = retrieveGameTokenList(gameStorage);
    return tokenList[idGame];
};

const generateStorageTokens = (idGame, token, gameStorage = localStorage) => {
    const tokenList = retrieveGameTokenList(gameStorage);
    if (idGame && token) {
        tokenList[idGame] = token;
    }
    return tokenList;
};

export const clearStorage = (gameStorage = localStorage) => {
    try {
        gameStorage.clear();
    } catch (error) {
        logStorageError(error, 'Storage connot be cleared in device');
    }
};
