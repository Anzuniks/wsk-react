import Likes from '../components/Likes'; // Varmista että polku on oikein

const SingleView = ({ item, setSelectedItem }) => {
  if (!item) return null;

  return (
    <section className="bg-[var(--social-bg)] p-6 rounded-lg border border-[var(--border)] shadow-xl max-w-2xl mx-auto my-8">
      <h3 className="text-2xl font-bold text-[var(--text-h)] mb-2">
        {item.title || 'Untitled media'}
      </h3>
      
      {/* Tässä kohtaa näytettäisiin itse kuva/video */}
      <div className="my-4 overflow-hidden rounded border border-[var(--border)]">
         <img 
           src={item.filename} 
           alt={item.title} 
           className="w-full h-auto object-contain max-h-[60vh]"
         />
      </div>

      <p className="text-[var(--text)] mb-6 leading-relaxed">
        {item.description || 'No description available for this item.'}
      </p>

      <hr className="border-[var(--border)] my-4" />

      {/* Lisätään tykkäykset tähän */}
      <Likes item={item} />

      <div className="mt-6 flex justify-end">
        <button 
          type="button" 
          onClick={() => setSelectedItem(null)}
          className="px-6 py-2 bg-[var(--accent)] text-white font-bold rounded-md hover:opacity-90 transition-opacity"
        >
          Close
        </button>
      </div>
    </section>
  );
};

export default SingleView;