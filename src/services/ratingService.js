import axios from "../utils/moviesAxios";

const ratingEndpoint = process.env.REACT_APP_API_RATING_ENDPOINT;

export const getRatings = (filters) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ratingEndpoint}`, {
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

export const postRating = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ratingEndpoint}`, data)
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

export const updateRating = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${ratingEndpoint}${id}/`, data)
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

export const deleteRating = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${ratingEndpoint}${id}/`)
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
