import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchComments, fetchPostsDate, fetchTags } from '../redux/slices/posts';
import axios from '../axios';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const [data, setData] = React.useState([]);
  const [b, setB] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [id, setId]  = React.useState('/');

  console.log(id, '1111122223333')

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  React.useEffect(() => {
    dispatch(fetchPostsDate());
    dispatch(fetchTags());
    dispatch(fetchComments());

    axios
      .get(`/posts/views`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  const sortByDate = () => {
    setB(true);
    setIndex(0);
  };

  const sortByViewsCount = () => {
    setB(false);
    setIndex(1);
  };
console.log(posts.items, '5731512605612')
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={index} aria-label="basic tabs example">
        <Tab label="Новые" onClick={sortByDate} />
        <Tab label="Популярные" onClick={sortByViewsCount} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : b ? posts.items : data).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id} // Убирается возможность редактировать статью, если человек не создавал эту статью
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments.items}
            id={id}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
