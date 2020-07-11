const express = require('express')
const path = require('path')
const e = require('express')

// Configurando o servidor
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

// Configurando utilização do arquivo Html
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html')
});

let arrayMessages = []

// Conectando com o socket-client e recebendo dados do front
io.on('connection', (socket) => {
    console.log(`Conectado ao socket ${socket.id}`)
    socket.emit('previousMessages', arrayMessages)
    socket.on('sendMessages', data => {
        arrayMessages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })
});

server.listen(3001);