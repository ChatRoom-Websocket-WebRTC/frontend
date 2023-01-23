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
  const room_name = localStorage.getItem("room_name");

  useEffect(() => {
    if (auth && auth.user && auth.user.username && !chatSocket.current) {
      console.log("auth: ", auth);

      const newChatSocket = new WebSocket(
        "ws://" + "127.0.0.1:8000" + "/chat/room/" + room_name + "/"
      );

      newChatSocket.onclose = function (e) {
        console.log("The socket close unexpectadly", e);
      };

      chatSocket.current = newChatSocket;
      console.log("chatsocket; ", chatSocket);

      axios.get(`${baseUrl}/chat/${room_name}/messages`).then((response) => {
        // setMessages(response.data);
        console.log("response.data:", response.data);
        response.data.forEach((msg) => {
          if (msg.message_type === "FILE") {
            // convert the message to binary and save it
            var binaryData = atob(msg.message);
            var binary = new Uint8Array(binaryData.length);
            for (var i = 0; i < binaryData.length; i++) {
              binary[i] = binaryData.charCodeAt(i);
            }
            var blob = new Blob([binary], { type: "application/octet-stream" });
            let newMessage = {
              ...msg,
              message: blob,
            };
            console.log("new_message:", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          } else if (msg.message_type === "TEXT") {
            // save the message as is
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        });
      });
    }
  }, [auth]);

  useEffect(() => {
    console.log("messages:", messages);
  }, [messages]);

  const handleNewUserMessage = (message) => {
    console.log("sent", message, chatSocket.current);
    chatSocket.current.send(
      JSON.stringify({
        message: message,
        message_type: "TEXT",
        sender: auth.user.username,
        room_name: localStorage.getItem("room_name"),
        file_extension: "empty"
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
          setMessages={setMessages}
        />
      )}
    </div>
  );
}

export default Chat;
