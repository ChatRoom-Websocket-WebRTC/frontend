import "./style.scss";

function FileMessage(props) {

var blob = new Blob([props.message.message], {
    type: "application/octet-stream",
  });
  var url = URL.createObjectURL(blob);

  return (
    <div className={`rcw-${props.message.sender}`}>
      <div
        className={`rcw-message-text ${
          props.is_server ? "rcw-message-cont" : "rcw-message-cont-server"
        }`}
      />
      <button>
      <a href={url} download={`default.${props.message.file_extension}`}>
        FILE
      </a>
    </button>
    </div>  
  );
}




  

export default FileMessage;
