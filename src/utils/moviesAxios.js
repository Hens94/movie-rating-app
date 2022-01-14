import axios from "axios";

const { REACT_APP_API_BASE_URL } = process.env;

const moviesAxios = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
});

/*
moviesAxios.interceptors.request.use(
  async function (config) {
    const currentSession = await Auth.currentSession();

    if (currentSession) {
      const {
        accessToken: { jwtToken },
      } = currentSession;

      config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);*/

export default moviesAxios;
