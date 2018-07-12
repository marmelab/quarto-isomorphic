import fetch from 'isomorphic-unfetch';
import config from '../../config/config.dist';

const doNothingOnError = error => {
    return {};
};

export const getGame = async idGame => {
    let url = `${config.apiUrl}/${idGame}`;
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(function(error) {
            return doNothingOnError(error);
        });
};
