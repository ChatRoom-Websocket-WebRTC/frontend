import { useEffect, useRef, useState, ElementRef, ImgHTMLAttributes, MouseEvent } from 'react';
import format from 'date-fns/format';

// import { scrollToBottom } from '../../../../../../utils/messages';
// import { MessageTypes, Link, CustomCompMessage, GlobalState } from '../../../../../../store/types';
// import { setBadgeCount, markAllMessagesRead } from '../../../../../../store/actions';
// import { MESSAGE_SENDER } from '../../../../../../constants';

import Loader from './components/Loader';
import Message from './components/Message';
import './styles.scss';
import serverAvatar from '../../assets/avatar.jpg';
import useAuth from '../../../../context/AuthContext';
import avatar from '../../../../assets/images/avatar.png';

export default function Messages(props) {
  const auth = useAuth();

  const isClient = type => {
    console.log('type', type);
    return type == 'CLIENT';
  };

  console.log("messages in Messages: ",props.messages);

  return (
    <div id="messages" className="rcw-messages-container"  dir="ltr">
      {props.messages?.map((message, index) => (
        <div
          id={`${isClient(message.sender_type) ? 'rcw-message-client-id' : 'rcw-message-server-id'}`}
          className={`rcw-message ${isClient(message.sender_type) ? 'rcw-message-client' : 'rcw-message-server'}`}
          // key={`${index}-${format(message.timestamp, 'hh:mm')}`}
          key={`${index}`}
        >
          {(!isClient(message.sender) || isClient(message.sender_type)) && true && (
            <img
              src={isClient(message.sender_type) ? auth?.user?.image || avatar : serverAvatar }
              className={`rcw-avatar ${isClient(message.sender_type) ? 'rcw-avatar-client' : ''}`}
              alt="profile"
            />
          )}
          <Message message={message} showTimeStamp={false} is_server={isClient(message.sender_type)}/>
        </div>
      ))}
      <Loader typing={props?.messages?.length === 0} />
    </div>
  );
}
