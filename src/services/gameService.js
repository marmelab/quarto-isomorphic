import fetch from 'isomorphic-unfetch';
import config from '../../config/config.dist';
import { logFetchError } from './warningService';

const fetchService = async url =>
    await fetch(url)
        .then(res => res.json())
        .catch(logFetchError);

export const newGame = async (numberOfPlayers, avatar) => {
    let url = config.apiUrl;
    if (numberOfPlayers === 1) {
        url += '/solo';
    }
    if (avatar) {
        url += '?avatar=' + avatar;
    }
    const res = await fetchService(url);
    return {
        game: res,
        token: res.tokenPlayerOne,
    };
};

export const getGame = async (idGame, token, register, avatar) => {
    let url = `${config.apiUrl}/${idGame}${
        register ? '?register=1' : '?token=' + token
    }`;
    if (avatar) {
        url += '&avatar=' + avatar;
    }
    const res = await fetchService(url);
    return {
        game: res,
        token: res.tokenPlayerTwo,
    };
};

export const listGames = async (listType, tokenList = []) => {
    const url = `${config.apiUrl}/${listType}list?tokenList=${JSON.stringify(
        tokenList,
    )}`;
    return await fetchService(url);
};

export const placePiece = async (idGame, x, y, token) => {
    const url = `${config.apiUrl}/${idGame}/place/${x}/${y}?token=${token}`;
    return await fetchService(url);
};

export const selectPiece = async (idGame, piece, token) => {
    const url = `${config.apiUrl}/${idGame}/select/${piece}?token=${token}`;
    return await fetchService(url);
};
