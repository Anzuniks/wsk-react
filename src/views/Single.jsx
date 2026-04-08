import { useLocation, useNavigate } from 'react-router';

const Single = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const item = state?.item;

  if (!item) {
    return (
      <div>
        <h2>Single</h2>
        <p>No media item selected.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const isImage = item.media_type?.startsWith('image/');
  const isVideo = item.media_type?.startsWith('video/');

  return (
    <div>
      <h2>{item.title}</h2>

      <p>
        <strong>Owner:</strong> {item.username ?? '-'}
      </p>

      {item.description && <p>{item.description}</p>}

      {isImage && (
        <img
          src={item.filename}
          alt={item.title}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}

      {isVideo && (
        <video
          src={item.filename}
          controls
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}

      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;