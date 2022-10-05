import { Avatar, Button, TextField } from '@mui/material';
import axios from '../../axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';

import styles from './Edit.module.scss';

const UserEdit = () => {
  // const userData = useSelector((state) => state.auth.data);
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

  const onClickRemoveImage = () => {
    if (window.confirm('Вы действительно хотите удалить?')) {
      setAvatarUrl('');
    }
  };

  React.useEffect(() => {
    axios
      .get(`/auth/me`)
      .then(({ data }) => {
        setAvatarUrl(data.avatarUrl);
        setFullName(data.fullName);
        setEmail(data.email);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  const onSubmit = async () => {
    try {
      // setLoading(true);

      const fields = {
        email,
        avatarUrl,
        fullName,
      };

      await axios.patch('/auth/me', fields);

      window.location.reload();

    } catch (err) {
      console.warn(err);
      alert('Ошибка при обновлении пользователя!');
    }
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Button onClick={() => inputFileRef.current.click()} className={styles.button}>
        <Avatar src={`http://localhost:4444${avatarUrl}`} /> Изменить
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {avatarUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          {/* <img src={`http://localhost:4444${avatarUrl}`} alt="Uploaded" /> */}
        </>
      )}
      <TextField
        className={styles.text}
        variant="standard"
        // fullWidth
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        className={styles.text}
        variant="standard"
        // fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={onSubmit} className={styles.buttons} size="large" variant="contained">
        Сохранить
      </Button>
      <Button className={styles.buttons} size="large">
        Отмена
      </Button>
    </>
  );
};

export default UserEdit;
