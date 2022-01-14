import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as type from "../../constants";
import {
  getRatings as getRatingsService,
  postRating as postRatingService,
  updateRating as updateRatingService,
  deleteRating as deleteRatingService,
} from "../../services/ratingService";

const useRating = (movieId) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const user = useSelector((state) => state.authReducer.user);

  const loadRatings = useCallback(async () => {
    setRatings([]);
    try {
      const response = await getRatingsService({ movie: movieId });
      setRatings(response);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(type.GET_RATINGS_SORRY, {
        variant: type.ERROR,
      });
    }
  }, [movieId, enqueueSnackbar]);

  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  useEffect(() => {
    const fetchData = async () => {
      setUserRating(null);
      try {
        const response = await getRatingsService({
          movie: movieId,
          user: user.name,
        });
        if (response.length > 0) {
          setUserRating(response[0]);
        }
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.GET_RATINGS_SORRY, {
          variant: type.ERROR,
        });
      }
    };

    if (user) {
      fetchData();
    }
  }, [enqueueSnackbar, movieId, user]);

  const handleRating = useCallback(
    async (rating, comment, refreshFunc = null) => {
      if (user) {
        try {
          let newUserRating = userRating;
          let newValues = {};
          let successMessage = "Thanks for your rating / message!";

          if (rating) {
            newValues = { ...newValues, score: rating };
            successMessage = type.GET_RATINGS_ADD;
          }
          if (comment) {
            newValues = { ...newValues, comment: comment };
            successMessage = type.GET_COMMENT_ADD;
          }

          if (userRating) {
            const { id, ...request } = userRating;

            newUserRating = await updateRatingService(id, {
              ...request,
              ...newValues,
            });
          } else {
            newUserRating = await postRatingService({
              movie: movieId,
              user: user.name,
              ...newValues,
            });
          }
          setUserRating(newUserRating);
          loadRatings();

          if (refreshFunc) refreshFunc();

          enqueueSnackbar(successMessage, {
            variant: type.SUCCESS,
          });
        } catch (error) {
          console.error(error);
          enqueueSnackbar(type.GET_RATINGS_SORRY, {
            variant: type.ERROR,
          });
        }
      } else {
        history.push("/auth/sign-in");
      }
    },
    [userRating, loadRatings, enqueueSnackbar, movieId, user, history]
  );

  const deleteRating = useCallback(
    async (id) => {
      try {
        await deleteRatingService(id);
        await loadRatings();
        enqueueSnackbar(type.DELETE_RATING_SUCCESS, {
          variant: type.SUCCESS,
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.DELETED_RATING_SORRY, {
          variant: type.ERROR,
        });
      }
    },
    [enqueueSnackbar, loadRatings]
  );

  return {
    ratings,
    userRating,
    handleRating,
    deleteRating,
  };
};

export default useRating;
