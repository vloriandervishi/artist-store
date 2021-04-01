export const getSavedArtIds = () => {
  const savedArtIds = localStorage.getItem('saved_arts')
    ? JSON.parse(localStorage.getItem('saved_arts'))
    : [];

  return savedArtIds;
};

export const saveArtIds = (ArtIdArr) => {
  if (ArtIdArr !=null && ArtIdArr.length > 0) {
    localStorage.setItem('saved_arts', JSON.stringify(ArtIdArr));
  } else {
    localStorage.removeItem('saved_arts');
  }
};

export const removeArtId = (ArtId) => {
  const savedArtIds = localStorage.getItem('saved_arts')
    ? JSON.parse(localStorage.getItem('saved_arts'))
    : null;

  if (!savedArtIds) {
    return false;
  }

  const updatedSavedArtIds = savedArtIds?.filter((savedArtId) => savedArtId !== ArtId);
  localStorage.setItem('saved_arts', JSON.stringify(updatedSavedArtIds));

  return true;
};
