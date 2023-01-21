import React from "react";
import { useState, useEffect, useRef } from "react";
import { Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import Conversation from "./Conversation";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import useAuth from "../../context/AuthContext";
function Chat(props) {
  const auth = useAuth();

  const chatSocket = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (auth && auth.user && auth.user.username && !chatSocket.current) {
      console.log("auth: ", auth);

      const newChatSocket = new WebSocket(
        "ws://" + "127.0.0.1:8000" + "/chat/room/" + auth.user.username + "/"
      );

      newChatSocket.onclose = function (e) {
        console.log("The socket close unexpectadly", e);
      };

      chatSocket.current = newChatSocket;
      console.log("chatsocket; ", chatSocket);

      axios
        .get(`${baseUrl}/chat/room/messages/${auth.user.username}/`)
        .then((response) => {
          setMessages(response.data);
          console.log("messages", messages);
          console.log("reposen.data", response.data);
        });
    }
  }, [auth, messages]);

  const handleNewUserMessage = (message) => {
    console.log("sent", message, chatSocket.current);
    chatSocket.current.send(
      JSON.stringify({
        message: message,
        username: auth.user.username,
        room_name: auth.user.username,
        sender_type: "CLIENT",
      })
    );
    // console.log("sent");
  };

  return (
    <div>
      {chatSocket.current && (
        <Conversation
          title="چت‌روم"
          subtitle="با هر کی میخوای چت کن"
          senderPlaceHolder="بنویس !!!"
          handleNewUserMessage={handleNewUserMessage}
          chatSocket={chatSocket.current}
          messages={messages}
          className={"active"}
        />
      )}
    </div>
  );
}

export default Chat;
