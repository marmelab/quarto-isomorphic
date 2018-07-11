import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import next from 'next';
import request from 'request';

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const config = { apiUrl: 'localhost/gameapi' };

const listenedGame = {};
const gameListeners = {};

const setIntervalForListenedGame = (socket, idGame) => {
    if (!listenedGame[idGame]) {
        listenedGame[idGame] = setInterval(() => {
            let url = `http://${config.apiUrl}/${idGame}`;
            request(
                url,
                (error, response, body) =>
                    !error &&
                    response.statusCode == 200 &&
                    gameListeners[idGame] &&
                    gameListeners[idGame].forEach(s =>
                        s.emit(`game${idGame}`, body),
                    ),
            );
        }, 3000);
        gameListeners[idGame] = [];
    }
    gameListeners[idGame].push(socket);
    return listenedGame[idGame];
};

const unsetIntervalForListenedGame = (socket, idGame) => {
    if (gameListeners[idGame]) {
        let index = gameListeners[idGame].indexOf(socket);
        if (index > -1) {
            gameListeners[idGame].splice(index, 1);
        }
    }

    if (!gameListeners[idGame] || gameListeners[idGame].length === 0) {
        clearInterval(listenedGame[idGame]);
        listenedGame[idGame] = undefined;
    }
};

io.on('connection', socket => {
    console.log('user connected');// eslint-disable-line

    socket.on('listenGame', data => {
        socket.idGame = data.id;
        setIntervalForListenedGame(socket, data.id);
    });
    socket.on('disconnect', function() {
        unsetIntervalForListenedGame(socket, socket.idGame);
        console.log('user disconnected');// eslint-disable-line
    });
});

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);// eslint-disable-line
    });
});
