import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import next from 'next';
import { ListenerService } from './src/services/listenerService';

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const listenerService = new ListenerService({});

io.on('connection', socket => {
    global.console.log('user connected');
    socket.on('listenGame', data => {
        socket.idGame = data.id;
        listenerService.register(socket, data.id, data.token);
    });
    socket.on('disconnect', function() {
        listenerService.unregister(socket.id, socket.idGame);
        global.console.log('user disconnected');
    });
});

nextApp.prepare().then(() => {
    app.get('/:idGame/updated', (req, res) => {
        listenerService.refreshGame(req.params.idGame);
        global.console.log(`game ${req.params.idGame} refreshed`);
        res.json(true);
    });

    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        global.console.log(`> Ready on http://localhost:${port}`);
    });
});
