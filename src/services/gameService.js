import fetch from 'isomorphic-unfetch';
import config from '../../config/config.dist';
import { logFetchError } from './warningService';

export const newGame = numberOfPlayers => {
    let url = config.apiUrl;
    if (numberOfPlayers === 1) {
        url += '/solo';
    }
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            return {
                idGame: res.idGame,
                game: res,
                token: res.tokenPlayerOne,
            };
        })
        .catch(logFetchError);
};

export const getGame = (idGame, token = undefined, register = undefined) => {
    let url = `${config.apiUrl}/${idGame}`;
    if (register) {
        url += '?register=1';
    } else {
        url += '?token=' + token;
    }
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            return {
                idGame: res.idGame,
                game: res,
                token: res.tokenPlayerTwo,
            };
        })
        .catch(logFetchError);
};

export const listGames = async (listType, tokenList = []) => {
    const url = `${config.apiUrl}/${listType}list?tokenList=${JSON.stringify(
        tokenList,
    )}`;
    return fetch(url)
        .then(res => res.json())
        .catch(logFetchError);
};

export const placePiece = async (idGame, x, y, token) => {
    const url = `${config.apiUrl}/${idGame}/place/${x}/${y}?token=${token}`;
    return fetch(url)
        .then(res => res.json())
        .catch(logFetchError);
};

export const selectPiece = async (idGame, piece, token) => {
    const url = `${config.apiUrl}/${idGame}/select/${piece}?token=${token}`;
    return fetch(url)
        .then(res => res.json())
        .catch(logFetchError);
};
