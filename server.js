import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import next from 'next';
import {
    refreshGameForOpenedSockets,
    registerGameListener,
    unregisterGameListener,
} from './src/services/listenerService';

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connection', socket => {
    console.log('user connected');// eslint-disable-line

    socket.on('listenGame', data => {
        socket.idGame = data.id;
        registerGameListener(socket, data.id);
    });
    socket.on('disconnect', function() {
        unregisterGameListener(socket, socket.idGame);
        console.log('user disconnected');// eslint-disable-line
    });
});

nextApp.prepare().then(() => {
    app.get('/:idGame/updated', (req, res) => {
        refreshGameForOpenedSockets(req.params.idGame);
        res.json(true);
    });

    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);// eslint-disable-line
    });
});
