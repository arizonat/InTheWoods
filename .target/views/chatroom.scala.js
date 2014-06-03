@(username: String)

//$(function(){
	var currentUser = "@username";

	var chatSocket = new WebSocket("@routes.Chatroom.chat(username).webSocketURL(request)");

	$('#input').focus();
	$('#input').bind('keypress', function(evt){
		if(evt.keyCode == 13){
			sendMessage();
			evt.preventDefault();
		}
	});
	
	function addMessage(username, message){
		$('#messages').append("<div class=\"message\">"+username+" says: "+message+"</div>");

	}
	
	function clearMessage(){
		$('#input').val("");
	}
	
	function sendMessage(){
		
		var message = {
			username: currentUser,
			message: $('#input').val()
		};
		
		chatSocket.send(JSON.stringify(message));
		clearMessage();
	}
	
	
	function testMessage(test){
		
		var message = {
			username: currentUser,
			message: test
		};
		
		chatSocket.send(JSON.stringify(message));
	}
	
	chatSocket.onmessage = function(event){
		var data = event.data;
		var packet = JSON.parse(data);
		addMessage(packet.username, packet.message);
	};
	
	chatSocket.onerror = function(event){
		console.error(event);
	}
	
	chatSocket.onclose = function(event){
		console.log("Socket closed");
	}
	
	$('#submit').on('click', function(evt){
		evt.preventDefault();
		sendMessage();
	});
	
//});