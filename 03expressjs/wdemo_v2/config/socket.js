var users = [];
module.exports = function(io){
	// Connect to Socket
	io.sockets.on('connection', function(socket){
		function updateUsers(){
			io.sockets.emit('users', users);
		}
		// Set Username
		socket.on('set user', function(data, callback){
			if(users.indexOf(data) != -1){
				callback(false);
			} else {
				callback(true);
				socket.username = data;
				users.push(socket.username);
				updateUsers();
			}
		});
	 
		
	
		socket.on('send message', function(data){
			io.sockets.emit('show message',{msg: data, user: socket.username});
		});
	
		socket.on('disconnect', function(data){
			if(!socket.username) return;
			users.splice(users.indexOf(socket.username), 1);
			updateUsers();
		});
	});
}