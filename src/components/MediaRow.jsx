const MediaRow = ({ item, selectedItem, setSelectedItem }) => {
    const isSelected = selectedItem?.media_id === item.media_id;

    return (
        <tr>
            <td>
                {item.thumbnail ? (
                    <img
                        src={item.thumbnail}
                        alt={item.title || 'thumbnail'}
                        width="80"
                    />
                ) : (
                    'No thumbnail'
                )}
            </td>
            <td>{item.title || '-'}</td>
            <td>{item.description || '-'}</td>
            <td>{item.created_at || '-'}</td>
            <td>{item.filesize || '-'}</td>
            <td>{item.media_type || '-'}</td>
            <td>
                <button type="button" onClick={() => setSelectedItem(item)}>
                    {isSelected ? 'Selected' : 'View'}
                </button>
            </td>
        </tr>
    );
};

export default MediaRow;