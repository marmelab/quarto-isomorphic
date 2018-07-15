export const logFetchError = error => {
    logError(error, 'Fetch error');
    return {};
};

export const logStorageError = error => {
    logError(error, 'Storage error');
    return {};
};

export const logCustomError = (error, message) => {
    logError(error, message);
    return {};
};

const logError = (error, message) => {
    console.log(message); // eslint-disable-line
    console.log(error); // eslint-disable-line
};
