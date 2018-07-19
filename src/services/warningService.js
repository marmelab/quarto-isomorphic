const logError = message => error => {
    console.log(message); // eslint-disable-line
    console.log(error); // eslint-disable-line
};

export const logFetchError = logError('Fetch error');

export const logStorageError = logError('Storage error');

export const logCustomError = (error, message) => logError(message)(error);
