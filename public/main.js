var socket = io.connect('http://127.0.0.1:3000', {'forceNew':true});
socket.on('messages', function(data){
	console.log(data);
	render(data);
})

var render = function(data){
	var html = data.map(function(element, index){
		return(`<div>
				<strong>${element.autor}: </strong>
				<em>${element.text}</em>
				</div>`);
	}).join(' ');

	document.getElementById('msg').innerHTML = html;
}

addMessage = function(obj){
	var payload = {
		'text':document.getElementById('texto').value,
		'autor':document.getElementById('username').value
	};
	socket.emit('new-message',payload );
	return false;	
}