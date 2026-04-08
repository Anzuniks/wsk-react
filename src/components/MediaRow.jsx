import PropTypes from 'prop-types';

const MediaRow = (props) => {
  const { item, setSelectedItem } = props;

  return (
    <tr>
      <td>
        <img src={item.filename} alt={item.title} width="160" />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleDateString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button onClick={() => setSelectedItem(item)}>View</button>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;