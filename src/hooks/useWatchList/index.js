import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import * as type from "../../constants";
import {
  getWatchList as getWatchListService,
  postWatchList as postWatchListService,
  deleteWatchList as deleteWatchListService,
} from "../../services/wathlistService";

const useWatchList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [watchList, setWatchList] = useState([]);
  const user = useSelector((state) => state.authReducer.user);

  const loadWatchList = useCallback(async () => {
    setWatchList([]);
    if (user) {
      try {
        const { name: username } = user;
        const response = await getWatchListService({ user: username });
        setWatchList(response);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.GET_WATCHLIST_SORRY, {
          variant: type.ERROR,
        });
      }
    }
  }, [user, enqueueSnackbar]);

  const findWatchListMovie = useCallback(
    async (movieId) => {
      if (user) {
        try {
          const { name: username } = user;
          const response = await getWatchListService({
            user: username,
            movie: movieId,
          });

          if (response.length > 0) {
            return response[0];
          }

          return null;
        } catch (error) {
          console.error(error);
          enqueueSnackbar(type.GET_WATCHLIST_SORRY, {
            variant: type.ERROR,
          });
        }
      }
    },
    [user, enqueueSnackbar]
  );

  const addWatchList = useCallback(
    async (movieId) => {
      if (user) {
        try {
          const { name: username } = user;
          await postWatchListService({ user: username, movie: movieId });
          enqueueSnackbar(type.ADD_WATCHLIST_SUCCESS, {
            variant: type.SUCCESS,
          });
        } catch (error) {
          console.error(error);
          enqueueSnackbar(type.ADD_WATCHLIST_SORRY, {
            variant: type.ERROR,
          });
        }
      }
    },
    [user, enqueueSnackbar]
  );

  const removeWatchList = useCallback(
    async (watchListId) => {
      try {
        await deleteWatchListService(watchListId);
        enqueueSnackbar(type.DELETE_WATCHLIST_SUCCESS, {
          variant: type.SUCCESS,
        });
        loadWatchList();
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.DELETE_WATCHLIST_SORRY, {
          variant: type.ERROR,
        });
      }
    },
    [enqueueSnackbar, loadWatchList]
  );

  return {
    watchList,
    loadWatchList,
    findWatchListMovie,
    addWatchList,
    removeWatchList,
  };
};

export default useWatchList;
