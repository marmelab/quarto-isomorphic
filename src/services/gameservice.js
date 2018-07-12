import fetch from 'isomorphic-unfetch';
import config from '../../config/config.dist';

const doNothingOnError = error => {
    console.log('Fetch error : '); // eslint-disable-line
    console.log(error); // eslint-disable-line
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
