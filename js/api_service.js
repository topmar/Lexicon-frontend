import API_KEY from "./api_key.js";
import * as urls from "./api_urls.js";

const apiRequest = async (url, method = "GET", data = null) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const getData = (endpoint) => apiRequest(endpoint, "GET");
const postData = (endpoint, data) => apiRequest(endpoint, "POST", data);
const deleteData = (endpoint, data) => apiRequest(endpoint, "DELETE", data);

export const searchDogs = (limit = 1) => getData(urls.searchDogs(limit));
export const getFavorites = () => getData(urls.GET_FAVORITES);
export const getDogDetailsById = (id) => getData(`${urls.GET_DETAILS(id)}`);
export const addFavorite = (data) => postData(urls.GET_FAVORITES, data);
export const deleteFavoriteById = (id) => deleteData(`${urls.GET_FAVORITES}/${id}`);
