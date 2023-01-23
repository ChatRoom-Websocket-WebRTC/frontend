import { useRef, useState, useEffect } from "react";
import cn from "classnames";

import Header from "./Header";
import Messages from "./Messages";
import Sender from "./Sender";
import useAuth from "../../../context/AuthContext";

import "./style.scss";

export default function Conversation({messages, setMessages, ...props}) {
  const [messageNumber, setMessageNumber] = useState(0);

  const updateMessages = (sendMessage, message) => {
    setMessageNumber(messageNumber + 1);
    setMessages((old) => [...old, sendMessage(message)]);
  };
  const auth = useAuth()


  props.chatSocket.onmessage = function (e) {
    console.log("onmessage");
    const data = JSON.parse(e.data);
    // console.log(data);
    if (data.message) {
      console.log("onmessage",data);
      if (data.sender !== auth.user.username) {
        console.log("sender: ",data.sender,"auth.username",auth.user.usernmae)
        setMessages((old) => [
          ...old,
          {
            message: data.message,
            sender: data.sender,
            showTimeStamp: false,
          },
        ]);
      }
    }
  };

  return (
    <div
      id="rcw-conversation-container"
      className={cn("rcw-conversation-container")}
      aria-live="polite"
    >
      <Header title={props.title || "ChatRoom"} subtitle={props.subtitle} />
      <Messages
        messages={messages}
        messageNumber={messageNumber}
        profileAvatar={props.profileAvatar}
        profileClientAvatar={props.profileClientAvatar}
        showTimeStamp={props.showTimeStamp}
      />

      <Sender
        updateMessages={updateMessages}
        handleNewUserMessage={props.handleNewUserMessage}
        sendMessage={props.handlerSendMsn}
        placeholder={props.senderPlaceHolder}
        disabledInput={props.disabledInput}
        autofocus={props.autofocus}
        onTextInputChange={props.onTextInputChange}
        buttonAlt={props.sendButtonAlt}
        onPressEmoji={props.togglePicker}
        chatSocket={props.chatSocket}
      />
    </div>
  );
}
