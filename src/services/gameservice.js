import fetch from 'isomorphic-unfetch';
import config from '../../config/config.dist';

function handleErrors(res) {
    if (!res.ok) {
        return Promise.reject(res.statusText);
    }
    return res;
}

export const getGame = async idGame => {
    let url = `${config.apiUrl}/${idGame}`;
    return fetch(url)
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            return res;
        });
};
