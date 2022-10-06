import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

export const Index = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = React.useState('');
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false);
  const userData = useSelector((state) => state.auth.data);

console.log(userData)
  
  const onSubmit = async (params) => {
    try {
      setLoading(true);
      
      const fields = {
        text,
      };
      
      await axios.post(`/posts/${id}/comment`, fields);
      
      // const _id = isEditing ? id : data._id;

      // navigate(`/posts/${_id}`);
      window.location.reload();
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании комментария!');
    }
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`http://localhost:4444${userData.avatarUrl}`}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
