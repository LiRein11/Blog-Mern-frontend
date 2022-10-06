import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from "../redux/slices/posts";

export const CommentsBlock = ({ itemss, id, items, children, isLoading = true }) => {
  const dispatch = useDispatch();
  const {comments} = useSelector((state) => state.posts);

React.useEffect(() => {
  dispatch(fetchComments());
}, []);

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            {id === obj.post || id === '/' ? (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar
                      alt={obj.user.fullName}
                      src={`http://localhost:4444${obj.user.avatarUrl}`}
                    />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="comment" height={25} width={120} />
                    <Skeleton variant="comment" height={18} width={230} />
                  </div>
                ) : (
                  <ListItemText primary={obj.user.fullName} secondary={obj.text} />
                )}
              </ListItem>
            ) : (
              ''
            )}
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
