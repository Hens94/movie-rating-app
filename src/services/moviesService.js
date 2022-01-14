import axios from "../utils/moviesAxios";

const moviesEndpoint = process.env.REACT_APP_API_MOVIES_ENDPOINT;

export const getMovies = (pagination, ordering, directUrl = null) => {
  return new Promise((resolve, reject) => {
    const request = directUrl
      ? axios.get(directUrl)
      : axios.get(`${moviesEndpoint}`, {
          params: { ...pagination, ...ordering },
        });

    request
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

export const getMovieDetail = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${moviesEndpoint}${id}`)
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

export const postMovie = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${moviesEndpoint}`, data)
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

export const updateMovie = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${moviesEndpoint}${id}/`, data)
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

export const deleteMovie = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${moviesEndpoint}${id}/`)
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
