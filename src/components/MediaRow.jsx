import { useUserContext } from '../hooks/contextHooks';
import { useMedia } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';

const MediaRow = ({ item, selectedItem, setSelectedItem }) => {
  const { user } = useUserContext();
  const { deleteMedia } = useMedia();
  const navigate = useNavigate();
  const isSelected = selectedItem?.media_id === item.media_id;

  // Tarkistetaan, onko käyttäjä kirjautunut JA (onko hän median omistaja TAI admin)
  const isOwnerOrAdmin = user && (user.user_id === item.user_id || user.level_id === 0);

  const handleDelete = async () => {
    try {
      await deleteMedia(item.media_id, localStorage.getItem('token'));
      navigate(0); // Refresh page
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleModify = async () => {
    console.log("modify", item);
    // TODO: Navigate to modify modal/view or implement inline editing
  };

  return (
    <tr className="border-b border-[var(--border)] hover:bg-[var(--accent-bg)] transition-colors duration-150">
      <td className="p-4">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title || 'thumbnail'}
            className="w-20 h-20 object-cover rounded shadow-sm border border-[var(--border)]"
          />
        ) : (
          <div className="w-20 h-20 bg-[var(--code-bg)] flex items-center justify-center text-xs text-[var(--text)] rounded">
            No image
          </div>
        )}
      </td>
      
      <td className="p-4 text-left font-medium text-[var(--text-h)]">
        {item.title || '-'}
      </td>
      
      <td className="p-4 text-left text-sm text-[var(--text)] max-w-xs truncate">
        {item.description || '-'}
      </td>
      
      <td className="p-4 text-sm text-[var(--text)] italic">
        {item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}
      </td>
      
      <td className="p-4 text-sm font-mono text-[var(--text)]">
        {item.filesize ? `${(item.filesize / 1024).toFixed(0)} KB` : '-'}
      </td>
      
      <td className="p-4">
        <span className="px-2 py-1 text-xs rounded bg-[var(--social-bg)] text-[var(--text-h)] uppercase tracking-wider">
          {item.media_type || '-'}
        </span>
      </td>

      <td className="p-4 text-right flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setSelectedItem(item)}
          className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 
            ${isSelected 
              ? 'bg-[var(--accent)] text-white shadow-inner scale-95' 
              : 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] hover:bg-[var(--accent)] hover:text-white'
            }`}
        >
          {isSelected ? 'Selected' : 'View'}
        </button>

        {isOwnerOrAdmin && (
          <>
            <button
              onClick={handleModify}
              className="px-4 py-2 rounded-md font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-sm"
            >
              Modify
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-md font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default MediaRow;