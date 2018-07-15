import { logStorageError } from './warningService';

const prefixStorage = '@Quarto:';
const tokenStorage = `${prefixStorage}gameTokens`;

export const storeGameToken = (idGame, token) => {
    try {
        const tokenList = generateStorageTokens(idGame, token);
        localStorage.setItem(tokenStorage, JSON.stringify(tokenList));
    } catch (error) {
        logStorageError(error, 'Data cannot be saved in device');
    }
};

export const retrieveGameTokenList = () => {
    try {
        const value = localStorage.getItem(tokenStorage);
        if (value !== null) {
            return JSON.parse(value);
        }
        return {};
    } catch (error) {
        logStorageError(error, 'Data cannot be read in device');
    }
};

export const retrieveGameToken = idGame => {
    const tokenList = retrieveGameTokenList();
    return tokenList[idGame];
};

const generateStorageTokens = (idGame, token) => {
    const tokenList = retrieveGameTokenList();
    if (idGame && token) {
        tokenList[idGame] = token;
    }
    return tokenList;
};

export const clearStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        logStorageError(error, 'Storage connot be cleared in device');
    }
};
