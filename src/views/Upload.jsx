import { useState } from 'react';
import useForm from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [file, setFile] = useState(null);
    const { postFile } = useFile();
    const { postMedia } = useMedia();
    const navigate = useNavigate();

    const initValues = {
        title: '',
        description: '',
    };

    const doUpload = async (inputs) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || !file) return;

            // VAIHE 1: Lähetetään varsinainen tiedosto tiedostopalvelimelle
            // Tämä palauttaa objektin, jossa on mm. tiedoston nimi (filename)
            const fileResult = await postFile(file, token);
            console.log('Tiedosto ladattu:', fileResult);

            // VAIHE 2: Lähetetään tiedoston tiedot Media API:lle
            // Käytetään tiedostopalvelimelta saatua nimeä ja lomakkeen kenttiä
            await postMedia(fileResult.data, inputs, token);
            
            alert('Upload successful!');
            navigate('/'); // Ohjataan etusivulle katsomaan uutta tiedostoa
        } catch (e) {
            console.log('Upload error:', e.message);
            alert('Upload failed: ' + e.message);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doUpload, initValues);

    const handleFileChange = (evt) => {
        if (evt.target.files && evt.target.files.length > 0) {
            setFile(evt.target.files[0]);
        }
    };

    return (
        <>
            <h1>Upload Media</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        id="title"
                        onChange={handleInputChange}
                        value={inputs.title}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        rows={5}
                        id="description"
                        onChange={handleInputChange}
                        value={inputs.description}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="file">File</label>
                    <input
                        name="file"
                        type="file"
                        id="file"
                        accept="image/*, video/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Esikatselukuva (preview) */}
                <div style={{ margin: '1rem 0' }}>
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : 'https://placehold.co/200?text=Choose+image'
                        }
                        alt="preview"
                        width="200"
                        style={{ display: 'block', borderRadius: '8px' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!file || inputs.title.length < 3}
                >
                    Upload
                </button>
            </form>
        </>
    );
};

export default Upload;