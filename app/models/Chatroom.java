package models;

import java.util.*;

import com.fasterxml.jackson.databind.JsonNode;

import play.mvc.*;
import play.libs.*;
import play.libs.F.*;

public class Chatroom {
	static List socketList = new ArrayList<WebSocket.Out<String>>();
	
	public static void enter(String username, WebSocket.In<JsonNode> in, WebSocket.Out<JsonNode> out){
		in.onMessage(new Callback<JsonNode>(){
			@Override
			public void invoke(JsonNode message) throws Throwable {
				String from = message.get("username").asText();
				String message_text = message.get("message").asText();
				sendMessage(from, message_text);
			}
		});
		socketList.add(out);
		
		sendMessage("chatroom","Say hello to " + username + "!");
	}
	
	public static void sendMessage(String username, String message_text){
		for (WebSocket.Out<JsonNode> out : (List<WebSocket.Out<JsonNode>>)socketList){
			JsonNode message = Json.parse("{\"username\":\""+username+"\" , \"message\":\""+message_text+"\" }");
			out.write(message);
		}
	}
}
