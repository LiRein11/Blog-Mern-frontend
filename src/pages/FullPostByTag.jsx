import React from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import ReactMarkdown from 'react-markdown';

export const FullPostByTag = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {tag} = useParams();

  React.useEffect(() => {
    axios
      .get(`/tags/${tag}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);
console.log(data)
  // if (isLoading) {
  //   return <Post isLoading={isLoading} />;
  // }

  return (
    <>
      <h1>#{tag}</h1>
      {isLoading ? (
        <Post isLoading={isLoading} />
      ) : (
        data.map((data, i) => (
          <Post
            id={data._id}
            title={data.title}
            imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
            // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
            user={data.user}
            createdAt={data.createdAt}
            viewsCount={data.viewsCount}
            commentsCount={3}
            tags={data.tags}
            isFullPost>
            <ReactMarkdown children={data.text} />
          </Post>
        ))
      )}

      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
