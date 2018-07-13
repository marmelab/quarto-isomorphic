import fetch from 'isomorphic-unfetch';
import config from '../../config/config.dist';

const logError = error => {
    console.log('Fetch error : '); // eslint-disable-line
    console.log(error); // eslint-disable-line
    return {};
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
