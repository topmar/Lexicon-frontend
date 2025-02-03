const BASE_API_URL = "https://api.thedogapi.com/v1";

export const SEARCH_DOGS = `${BASE_API_URL}/images/search?limit=10`;
export const GET_FAVORITES = `${BASE_API_URL}/favourites`;
export const GET_DETAILS = (id) => `${BASE_API_URL}/images/${id}`;

export const searchDogs = (limit = 10) => {
  return `${BASE_API_URL}/images/search?limit=${limit}`;
};

// images
// GET
// images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1
// GET:id
// images/${id}
// GET
// images/?limit=10&page=0&order=DESC
// POST
// images/upload
// DELETE
// images/:image_id
// GET breeds
// images/:image_id/breeds
// POST breeds
// images/:image_id/breeds
// DELETE breeds
// images/:image_id/breeds/:breed_id

// breeds
// GET
// breeds?limit=10&page=0
// GET:id
// breeds/:breed_id

// favorites
//  GET
// favourites
// GET:id
// favourites/:favourite_id
// POST
// favourites
// DELETE
// favourites/:favourite_id

// votes
// GET
// votes
// GET:id
// votes/:vote_id
// POST
// votes
// DELETE
// votes/:vote_id