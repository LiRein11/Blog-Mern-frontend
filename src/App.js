
import Container from '@mui/material/Container';
import React from 'react';
import { useDispatch} from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login, FullPostByTag } from './pages';
import UserEdit from './pages/Edit';
import { fetchAuthMe} from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/tags/:tag" element={<FullPostByTag />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/edit" element={<UserEdit />} />

        </Routes>
      </Container>
    </>
  );
}

export default App;
