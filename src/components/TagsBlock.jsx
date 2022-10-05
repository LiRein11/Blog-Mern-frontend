import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { Link, useParams } from 'react-router-dom';
// import axios from '../axios';

export const TagsBlock = ({ items, isLoading = true }) => {
  // const params = useParams();
  
  // const [tags, setTags] = React.useState([]);

  // React.useEffect(() => {
  //   axios
  //     .get(`/tags/`)
  //     .then((res) => setTags(res.data))
  //     .catch((err) => {
  //       console.warn(err);
  //       alert('Ошибка при получении статьи');
  //     });
  // }, []);



  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link style={{ textDecoration: 'none', color: 'black' }} to={`/tags/${name}`}>
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
