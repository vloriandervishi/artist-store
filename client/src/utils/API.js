

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchArtApi= (query) => {
  return fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&query[term][is_public_domain]=true&limit=100=&fields=id,title,image_id,exhibition_history

  `);
  
};
