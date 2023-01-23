import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import cn from "classnames";
import useAuth from "../../../../context/AuthContext";
import send from "../../assets/send_button.png";
import Button from '@mui/material/Button';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import "./style.scss";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const brRegex = /<br>/g;

function QualitySelectDialog({setQuality}) {
  

  const handleChange = (event) => {
    setQuality(event.target.value);
  }

  return (
    // <Container component={Paper}>
    // <FormControl fullWidth>
    <Select
      // value={quality}
      defaultValue={360}
      onChange={handleChange}
      autoWidth
      label="Quality"
    >
      <MenuItem value={360}>360</MenuItem>
      <MenuItem value={480}>480</MenuItem>
      <MenuItem value={720}>720</MenuItem>
    </Select>
    // </FormControl>
    // </Container>

  );
}

function Sender(props, ref) {

  const [quality, setQuality] = useState(360);
  // const showChat = useSelector((state) => state.behavior.showChat);
  const inputRef = useRef(null);
  const refContainer = useRef(null);
  const [enter, setEnter] = useState(false);
  const [firefox, setFirefox] = useState(false);
  const [height, setHeight] = useState(0);
  const [binaryFile, setBinaryFile] = useState();
  const auth = useAuth();

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  }

  const handleDialogClose = () => {
    setOpen(false);
  }

  // @ts-ignore
  useEffect(() => {
    if (props.showChat && props.autofocus) inputRef.current?.focus();
  }, [props.showChat]);

  const sendMessage = (message) => {
    return { sender: auth.user.username, message: message, showAvatar: false };
  };

  const handleSendMessage = () => {
    const el = inputRef.current;
    if (el.innerHTML) {
      props.updateMessages(sendMessage, el.innerText);
      props.handleNewUserMessage(el.innerText);
      console.log(el.innerHTML);
      el.innerHTML = "";
    }
  };

  const handlerOnKeyPress = (event) => {
    const el = inputRef.current;

    if (event.charCode == 13 && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
    if (event.charCode === 13 && event.shiftKey) {
      event.preventDefault();
      setEnter(true);
    }
  };

  const handleChooseFile = (e) => {
    let file = e.target.files[0];
    console.log("file extension", file.name.split(".")[1]);
    console.log("props", props);
    var reader = new FileReader();
    reader.onload = function () {
      
      var base64encoded = btoa(new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      var message = {
        message: base64encoded,
        room_name: localStorage.getItem("room_name"),
        message_type: "FILE",
        sender: auth.user.username,
        file_extension: file.name.split(".")[1]
      };
      var jsonString = JSON.stringify(message);
      console.log("json_to_string:", jsonString)
      props.chatSocket.send(jsonString);

      let newMessage = {
        ...message,
        message: reader.result,
      };
      console.log("new_message:", newMessage);
      props.setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    reader.readAsArrayBuffer(file);
  };

  const checkSize = () => {
    const senderEl = refContainer.current;
    if (senderEl && height !== senderEl.clientHeight) {
      const { clientHeight } = senderEl;
      setHeight(clientHeight);
    }
  };

  const handlerOnKeyUp = (event) => {
    const el = inputRef.current;
    if (!el) return true;
    // Conditions need for firefox
    if (firefox && event.key === "Backspace") {
      if (el.innerHTML.length === 1 && enter) {
        el.innerHTML = "";
        setEnter(false);
      } else if (brRegex.test(el.innerHTML)) {
        el.innerHTML = el.innerHTML.replace(brRegex, "");
      }
    }
    checkSize();
  };

  return (
    
    <div ref={refContainer} className="rcw-sender">
      {/* <QualitySelect/> */}
      <div
        className={cn("rcw-new-message", {
          "rcw-message-disable": props.disabledInput,
        })}
      >
        <div
          spellCheck
          className="rcw-input"
          role="textbox"
          contentEditable={!props.disabledInput}
          ref={inputRef}
          placeholder={props.placeholder}
        ></div>
        <Button component="label">
          <AttachFileIcon className="sender-add-button" />
          <input
            type="file"
            hidden
            onChange={handleChooseFile}
            accept=".jpg,.jpeg,.png,.mp4,.mkv"
          />
        </Button>
      </div>
      
      <button type="submit" className="rcw-send" onClick={handleSendMessage}>
        <SendIcon className="rcw-send-icon" alt="buttonAlt" dir="ltr" />
      </button>
      
    </div>
  );
}

export default forwardRef(Sender);
