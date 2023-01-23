import React, { useEffect, useState } from "react";
import {
  ListItemButton,
  ListItemText,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../utils/constants";
import useAuth from "../../../context/AuthContext";
import AvatarIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import './style.scss'

function GroupList(props) {
  const [groups, setGroups] = useState();
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`${baseUrl}/chat/groups/me/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setGroups(response.data);
        console.log(groups);
      });
  }, [auth]);

  return (
    <React.Fragment>
      <div>
        {groups?.map((group) => (
          <div>
            <ListItem sx={{border:"2px solid gray", borderRadius:3}}>
              <ListItemAvatar>
                <Avatar>
                  <AvatarIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={group.room_name} />
            </ListItem>
            ,
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default GroupList;
