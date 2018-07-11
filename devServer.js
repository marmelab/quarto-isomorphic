// ./devServer.js
require('babel-register')({
    babelrc: false,
    presets: [
        [
            'env',
            {
                targets: {
                    node: 'current',
                },
                useBuiltIns: true,
            },
        ],
    ],
    plugins: ['transform-class-properties', 'transform-object-rest-spread'],
});
require('./server');
