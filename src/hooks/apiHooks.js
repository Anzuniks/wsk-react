import { useEffect, useState } from 'react';

// Apufunktio hoitamaan fetch-pyynnöt ja virheenkäsittelyn
const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message || 'Verkkovirhe');
    }
    return json;
};

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
                setMediaArray(Array.isArray(json) ? json : []);
            } catch (error) {
                console.error('Virhe getMedia-funktiossa:', error.message);
                setMediaArray([]);
            }
        };
        getMedia();
    }, []);

    // Lisätty: Tallentaa mediatiedot tietokantaan (tiedoston nimen ja otsikon)
    const postMedia = async (fileData, inputs, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                title: inputs.title,
                description: inputs.description,
                filename: fileData.filename,
                media_type: fileData.media_type,
            }),
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/media', fetchOptions);
    };

    // Lisätty: Poistaa median ID:n perusteella
    const deleteMedia = async (id, token) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/media/' + id, fetchOptions);
    };

    // Lisätty: Muokkaa olemassa olevan median tietoja (title, description)
    const modifyMedia = async (id, inputs, token) => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(inputs),
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/media/' + id, fetchOptions);
    };

    return { mediaArray, postMedia, deleteMedia, modifyMedia };
};

// Uusi: Hoitaa varsinaisen tiedoston (binääridatan) lähetyksen
const useFile = () => {
    const postFile = async (file, token) => {
        const formData = new FormData();
        formData.append('file', file);

        const fetchOptions = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: formData,
        };

        return await fetchData(import.meta.env.VITE_UPLOAD_SERVER + '/upload', fetchOptions);
    };

    return { postFile };
};

const useAuthentication = () => {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
    };

    return { postLogin };
};

const useUser = () => {
    const getUserByToken = async (token) => {
        const fetchOptions = {
            headers: { Authorization: 'Bearer ' + token },
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', fetchOptions);
    };

    const postUser = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/users', fetchOptions);
    };

    return { getUserByToken, postUser };
};

const useLike = () => {
  const postLike = async (media_id, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ media_id }),
    };
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes', fetchOptions);
  };

  const deleteLike = async (like_id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes/' + like_id, fetchOptions);
  };

  const getLikeCountByMediaId = async (media_id) => {
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes/count/' + media_id);
  };

  const getLikeByUser = async (media_id, token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    // This endpoint returns an array of likes for a file. The component will check if the current user's like is present.
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes/file/' + media_id, fetchOptions);
  };

  return { postLike, deleteLike, getLikeCountByMediaId, getLikeByUser };
};

export { useMedia, useAuthentication, useUser, useFile, useLike };