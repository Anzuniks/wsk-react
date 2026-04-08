import { useEffect, useState } from 'react';
import MediaRow from '../components/MediaRow';
import { fetchData } from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // 1) Fetch media items from Media API
        const mediaItems = await fetchData(
          import.meta.env.VITE_MEDIA_API + '/media'
        );

        // 2) For each media item, fetch the owner (username) from Auth API
        const mediaWithUsers = await Promise.all(
          mediaItems.map(async (item) => {
            const user = await fetchData(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id
            );

            // Add username to the media item
            return { ...item, username: user.username };
          })
        );

        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('load media error:', error);
      }
    };

    load();
  }, []);

  return (
    <>
      <h2>My media</h2>

      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;