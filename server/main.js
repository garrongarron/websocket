var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
		id:1,
		text:'Hola soy un mensaje',
		autor:'Fulano'
	}];

app.use(express.static('public'))

app.get("/", function(req, res){
	res.status(200).send('hola mundo');
})

io.on('connection', function (socket){
	console.log('alguien se ha conectado con sockets');
	socket.emit('messages',messages);

	socket.on('new-message', function(data){
		messages.push(data);
		io.sockets.emit('messages',messages);
	})
	console.log('alguien se ha conectado con sockets');
});
const hostname = '127.0.0.1';
server.listen(3000,hostname,  function(){
	console.log('Servidor corriendo en http');
});