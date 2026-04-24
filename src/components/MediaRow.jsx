const MediaRow = ({ item, selectedItem, setSelectedItem }) => {
  const isSelected = selectedItem?.media_id === item.media_id;

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
      
      {/* Käytetään font-medium ja tummempaa tekstiväriä otsikolle */}
      <td className="p-4 text-left font-medium text-[var(--text-h)]">
        {item.title || '-'}
      </td>
      
      {/* Rajoitetaan kuvauksen pituutta, ettei taulukko veny liikaa */}
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

      <td className="p-4 text-right">
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
      </td>
    </tr>
  );
};

export default MediaRow;