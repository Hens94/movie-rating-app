import axios from "../utils/moviesAxios";

const genreEndpoint = process.env.REACT_APP_API_GENRES_ENDPOINT;

export const getGenres = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${genreEndpoint}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
