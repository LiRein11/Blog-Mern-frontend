import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

export const Index = () => {
  // const {id} = useParams();
  // const [comment, setComment] = React.useState('');

  // React.useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(`/posts/${id}`)
  //       .then(({ data }) => {
  //         setComment(data.comment);
  //       })
  //       .catch((err) => {
  //         console.warn(err);
  //         alert('Ошибка при получении комментария');
  //       });
  //   }
  // }, []);


  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
