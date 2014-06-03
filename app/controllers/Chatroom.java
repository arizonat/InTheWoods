package controllers;

import com.fasterxml.jackson.databind.JsonNode;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.WebSocket;
import views.html.*;

public class Chatroom extends Controller {
	
	public static WebSocket<JsonNode> chat(final String username){
		WebSocket<JsonNode> ws = new WebSocket<JsonNode>(){
	        // Called when the Websocket Handshake is done.
	        public void onReady(WebSocket.In<JsonNode> in, WebSocket.Out<JsonNode> out) {
	        	models.Chatroom.enter(username, in, out);
	        }	        
		};
		return ws;
	}

	public static Result show(String username){
		return ok(views.html.chatroom.render(username));
	}
	
	public static Result getJs(String username){
		return ok(views.js.chatroom.render(username));
	}
}
