const config = { apiUrl: 'localhost/gameapi' };

import express from 'express';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

//const request = require('request');

import request from 'request';

io.on('connection', socket => {
    const idgame = { true: 479, false: 480 };
    let i = true;
    setInterval(async () => {
        let url = `http://${config.apiUrl}/${idgame[i]}`;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                socket.broadcast.emit('game', body);
            }
        });
        i = !i;
    }, 3000);
    console.log('user connected');// eslint-disable-line
    socket.on('game', data => {
        socket.broadcast.emit('game', data);
    });
    socket.on('disconnect', function() {
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
