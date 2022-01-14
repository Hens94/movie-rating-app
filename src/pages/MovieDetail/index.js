import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Divider as MuiDivider } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import MovieHeader from "../../components/Movies/MovieDetail/MovieHeader";
import MovieContent from "../../components/Movies/MovieDetail/MovieContent";

import useMovies from "../../hooks/useMovies";
import useRating from "../../hooks/useRating";
import useWatchList from "../../hooks/useWatchList";

const Divider = styled(MuiDivider)(spacing);

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState();
  const [userWatchListId, setUserWatchListId] = useState(null);
  const { getMovieDetail } = useMovies(null);
  const { ratings, userRating, handleRating } = useRating(movieId);
  const { findWatchListMovie, addWatchList, removeWatchList } = useWatchList();

  const refreshMovieDetail = useCallback(async () => {
    try {
      const movie = await getMovieDetail(movieId);
      setMovieData(movie);
    } catch (error) {
      console.error(error);
    }
  }, [getMovieDetail, movieId]);

  useEffect(() => {
    refreshMovieDetail();
  }, [refreshMovieDetail]);

  const findMovieInWatchList = useCallback(async () => {
    try {
      const response = await findWatchListMovie(movieId);
      if (response) {
        setUserWatchListId(response.id);
      } else {
        setUserWatchListId(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [findWatchListMovie, movieId]);

  useEffect(() => {
    findMovieInWatchList();
  }, [findMovieInWatchList]);

  const handleWatchList = useCallback(async () => {
    if (userWatchListId) {
      await removeWatchList(userWatchListId);
    } else {
      await addWatchList(movieId);
    }
    await findMovieInWatchList();
  }, [
    userWatchListId,
    addWatchList,
    removeWatchList,
    movieId,
    findMovieInWatchList,
  ]);

  const isInWatchList = !!userWatchListId;

  return (
    <>
      <Helmet title="Movie Detail" />
      {movieData && (
        <MovieHeader
          data={movieData}
          userRating={userRating ? userRating.score : null}
        />
      )}
      <Divider my={6} />
      {movieData && (
        <MovieContent
          data={movieData}
          userRating={userRating}
          ratings={ratings}
          onRating={handleRating}
          onRefresh={refreshMovieDetail}
          onChangeWatchList={handleWatchList}
          isInWatchList={isInWatchList}
        />
      )}
    </>
  );
};

export default MovieDetail;
