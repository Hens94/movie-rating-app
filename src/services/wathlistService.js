import axios from "../utils/moviesAxios";

const wachlistEndpoint = process.env.REACT_APP_API_WATCHLIST_ENDPOINT;

export const getWatchList = (filters) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${wachlistEndpoint}`, {
        params: filters,
      })
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

export const postWatchList = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${wachlistEndpoint}`, data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteWatchList = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${wachlistEndpoint}${id}/`)
      .then((response) => {
        if (response.status === 204) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
