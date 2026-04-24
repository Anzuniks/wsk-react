import { useEffect, useState, useCallback } from 'react';
import { useLike } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/contextHooks';

const Likes = ({ item }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null);
  const { postLike, deleteLike, getLikeCountByMediaId, getLikeByUser } = useLike();
  const { user } = useUserContext();

  // Move the async function inside the effect to avoid cascading renders
  useEffect(() => {
    const getLikes = async () => {
      try {
        const countResponse = await getLikeCountByMediaId(item.media_id);
        setLikeCount(countResponse.count);

        const token = localStorage.getItem('token');
        if (user && token) {
          const userLikesArray = await getLikeByUser(item.media_id, token);
          setUserLike(userLikesArray.length > 0 ? userLikesArray[0] : null);
        } else {
          setUserLike(null);
        }
      } catch (error) {
        console.error('getLikes error', error);
      }
    };

    getLikes();
  }, [item.media_id, user, getLikeCountByMediaId, getLikeByUser]);

  const handleLike = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (userLike) {
        await deleteLike(userLike.like_id, token);
      } else {
        await postLike(item.media_id, token);
      }
      // Refresh like data after action
      const countResponse = await getLikeCountByMediaId(item.media_id);
      setLikeCount(countResponse.count);
      
      if (user && token) {
        const userLikesArray = await getLikeByUser(item.media_id, token);
        setUserLike(userLikesArray.length > 0 ? userLikesArray[0] : null);
      }
    } catch (error) {
      console.error('handleLike error', error);
    }
  }, [userLike, user, postLike, deleteLike, getLikeCountByMediaId, getLikeByUser, item.media_id]);

  return (
    <div className="flex items-center gap-3 my-4">
      <p className="font-bold text-lg">{likeCount} likes</p>
      {user && (
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 border 
            ${userLike 
              ? 'bg-red-500 text-white border-red-600 shadow-md' 
              : 'bg-white text-red-500 border-red-500 hover:bg-red-50'}`}
        >
          {userLike ? '❤️ Liked' : '🤍 Like'}
        </button>
      )}
    </div>
  );
};

export default Likes;