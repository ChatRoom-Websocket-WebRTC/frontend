import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextField } from "@mui/material";
import "./style.scss";

export const TextInput = () => {
  return (
    <>
      <TextField id="standard-text" label="send" className="sender">
      </TextField>
        <Button className="send-icon">
          <SendIcon />
        </Button>
    </>
  );
};
