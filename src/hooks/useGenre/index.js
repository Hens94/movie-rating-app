import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import * as type from "../../constants";
import { getGenres as getGenresService } from "../../services/genreService";

const useGenre = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setGenres([]);
      try {
        const response = await getGenresService();
        if (response.length > 0) {
          setGenres(response);
        }
      } catch (error) {
        console.error(error);
        setGenres([]);
        enqueueSnackbar(type.GET_GENRE_SORRY, {
          variant: type.ERROR,
        });
      }
    };

    fetchData();
  }, [enqueueSnackbar]);

  return {
    genres,
  };
};

export default useGenre;
