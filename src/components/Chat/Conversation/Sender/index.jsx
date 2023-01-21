import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
// import { useSelector } from 'react-redux';
import cn from 'classnames';

// import { GlobalState } from 'src/store/types';

// import { getCaretIndex, isFirefox, updateCaret, insertNodeAtCaret, getSelection } from '../../../../../../utils/contentEditable'
import send from '../../assets/send_button.png';
import './style.scss';
import { TextField } from '@mui/material';


const brRegex = /<br>/g;


function Sender(props, ref) {
  // const showChat = useSelector((state) => state.behavior.showChat);
  const inputRef = useRef(null);
  const refContainer = useRef(null);
  const [enter, setEnter]= useState(false)
  const [firefox, setFirefox] = useState(false);
  const [height, setHeight] = useState(0)
  // @ts-ignore
  useEffect(() => { if (props.showChat && props.autofocus) inputRef.current?.focus(); }, [props.showChat]);


  const sendMessage = (message) =>{
      return {"sender":"emad","message":message,"showAvatar":false, sender_type:"CLIENT"}
  }

  const handleSendMessage = () => {
    const el = inputRef.current;
    if(el.innerHTML) {
      props.updateMessages(sendMessage,el.innerText);
      props.handleNewUserMessage(el.innerText)
      console.log(el.innerHTML)
      el.innerHTML = ''
    }
  }



  const handlerOnKeyPress = (event) => {
    const el = inputRef.current;

    if(event.charCode == 13 && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage();
    }
    if(event.charCode === 13 && event.shiftKey) {
      event.preventDefault()
      setEnter(true)
    }
  }

  // TODO use a context for checkSize and toggle picker
  const checkSize = () => {
    const senderEl = refContainer.current
    if(senderEl && height !== senderEl.clientHeight) {
      const {clientHeight} = senderEl;
      setHeight(clientHeight)
      // onChangeSize(clientHeight ? clientHeight -1 : 0)
    }
  }

  const handlerOnKeyUp = (event) => {
    const el = inputRef.current;
    if(!el) return true;
    // Conditions need for firefox
    if(firefox && event.key === 'Backspace') {
      if(el.innerHTML.length === 1 && enter) {
        el.innerHTML = '';
        setEnter(false);
      }
      else if(brRegex.test(el.innerHTML)){
        el.innerHTML = el.innerHTML.replace(brRegex, '');
      }
    }
    checkSize();
  }

  // const handlerOnKeyDown= (event) => {
  //   const el = inputRef.current;
    
  //   if( event.key === 'Backspace' && el){
  //     const caretPosition = getCaretIndex(inputRef.current);
  //     const character = el.innerHTML.charAt(caretPosition - 1);
  //     if(character === "\n") {
  //       event.preventDefault();
  //       event.stopPropagation();
  //       el.innerHTML = (el.innerHTML.substring(0, caretPosition - 1) + el.innerHTML.substring(caretPosition))
  //       updateCaret(el, caretPosition, -1)
  //     }
  //   }
  // }

  const handlerPressEmoji = () => {
    checkSize();
  }

  return (
    <div ref={refContainer} className="rcw-sender">
      {/* <button className='rcw-picker-btn' type="submit" onClick={props.handlerPressEmoji}>
        <img src={emoji} className="rcw-picker-icon" alt="" />
      </button> */}
      <div className={cn('rcw-new-message', {
          'rcw-message-disable': props.disabledInput,
        })
      }>
        <div
          spellCheck
          className="rcw-input"
          role="textbox"
          contentEditable={!props.disabledInput} 
          ref={inputRef}
          placeholder={props.placeholder}
          // onInput={props.handlerOnChange}
          // onKeyPress={props.handlerOnKeyPress}
          // onKeyUp={props.handlerOnKeyUp}
          // // onKeyDown={handlerOnKeyDown}
        />
        
      </div>
      <button type="submit" className="rcw-send" onClick={handleSendMessage}>
        <img src={send} className="rcw-send-icon" alt="buttonAlt" dir="ltr" />
      </button>
    </div>
  );
}

export default forwardRef(Sender);
