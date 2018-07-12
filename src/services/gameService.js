import fetch from 'isomorphic-unfetch';
import config from '../../config/config.dist';

const logError = error => {
    console.log('Fetch error : '); // eslint-disable-line
    console.log(error); // eslint-disable-line
    return {};
};

export const newGame = numberOfPlayers => {
    let url = config.apiUrl;
    if (numberOfPlayers === 1) {
        url += '/solo';
    }
    //const method = 'POST';
    //const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        //method,
        //headers,
    })
        .then(res => res.json())
        .then(res => {
            //storeGameToken(res.idGame, res.tokenPlayerOne);
            return res;
        })
        .catch(logError);
};

export const getGame = async idGame => {
    let url = `${config.apiUrl}/${idGame}`;
    return fetch(url)
        .then(res => res.json())
        .catch(logError);
};

export const listGames = async listType => {
    let url = `${config.apiUrl}/${listType}list`;
    return fetch(url)
        .then(res => res.json())
        .catch(logError);
};

export const placePiece = async (idGame, x, y) => {
    let url = `${config.apiUrl}/${idGame}/place/${x}/${y}`;
    //let token = await retrieveGameToken(game.idGame);
    //url += '?token=' + token;
    //const method = 'PUT';
    //const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        //method,
        //headers,
    })
        .then(res => res.json())
        .catch(logError);
};

export const selectPiece = async (idGame, piece) => {
    let url = `${config.apiUrl}/${idGame}/select/${piece}`;
    //let token = await retrieveGameToken(game.idGame);
    //url += '?token=' + token;
    //const method = 'PUT';
    //const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        //method,
        //headers,
    })
        .then(res => res.json())
        .catch(logError);
};
