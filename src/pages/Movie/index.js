import { useState } from "react";
import { Divider as MuiDivider } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import MoviesFilter from "../../components/Movies/MoviesFilter";
import MoviesList from "../../components/Movies/MoviesList";

import useMovies from "../../hooks/useMovies";

const Divider = styled(MuiDivider)(spacing);

const Movie = () => {
  const [orderFilters, setOrderFilters] = useState();
  const { movies, handleLoadMore, dataCount } = useMovies(orderFilters);

  const handleFilter = (orderFilters) => {
    setOrderFilters(orderFilters);
  };

  return (
    <>
      <Helmet title="Movies" />
      <MoviesFilter onFilter={handleFilter} />

      <Divider my={6} />
      <MoviesList
        data={movies}
        onFetchMore={handleLoadMore}
        dataLength={dataCount}
      />
    </>
  );
};

export default Movie;
