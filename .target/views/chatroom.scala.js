@(username: String)

$(function(){
	var currentUser = "@username";

	$('#input').focus();
	$('#input').bind('keypress', function(evt){
		if(evt.keyCode == 13){
			sendMessage();
		}
	});
	
	function addMessage(username, message){
		$('#messages').append("<div class=\"message\">"+username+" says: "+message+"</div>")
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
	
	var chatSocket = new WebSocket("@routes.Chatroom.chat(username).webSocketURL(request)");
	
	chatSocket.onmessage = function(event){
		var data = event.data;
		var packet = JSON.parse(data);
		addMessage(packet.username, packet.message);
	};
	
	$('#submit').on('click', function(){
		sendMessage();
	});
	
});