import PropTypes from 'prop-types';

const SingleView = (props) => {
  const { item, setSelectedItem } = props;

  if (!item) return null;

  const isImage = item.media_type.startsWith('image/');
  const isVideo = item.media_type.startsWith('video/');

  return (
    <dialog open={Boolean(item)}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>

      {isImage && <img src={item.filename} alt={item.title} />}
      {isVideo && <video src={item.filename} controls />}

      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
  );
};

SingleView.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    media_type: PropTypes.string.isRequired,
  }),
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;