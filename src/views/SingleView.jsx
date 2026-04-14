const SingleView = ({ item, setSelectedItem }) => {
    return (
        <section>
            <h3>{item.title || 'Untitled media'}</h3>
            <p>{item.description || 'No description'}</p>
            <button type="button" onClick={() => setSelectedItem(null)}>
                Close
            </button>
        </section>
    );
};

export default SingleView;