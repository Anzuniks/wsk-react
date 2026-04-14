import { useState } from 'react';
import MediaRow from './MediaRow';
import SingleView from '../views/SingleView';
import { useMedia } from './hooks/apiHooks'; // Tuodaan uusi custom hook

const Home = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    
    // Otetaan mediaArray käyttöön custom hookista (korvaa vanhan pitkän testidatan)
    const { mediaArray } = useMedia();

    return (
        <>
            <h2>My media</h2>

            {selectedItem && (
                <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
            )}

            <table>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mediaArray.map((item) => (
                        <MediaRow
                            key={item.media_id}
                            item={item}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Home;