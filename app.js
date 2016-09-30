'use strict';

const Hapi = require('hapi');
const PORT = process.env.PORT || 3000;
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({host: 'localhost', port: PORT});
const io = require('socket.io')(server.listener);
io.on('connection', (socket) => {
    console.log('connect!!!');
    
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });    
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, reply) => {
            reply.file('./public/index.html');
        }
    });
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});