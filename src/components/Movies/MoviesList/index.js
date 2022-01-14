import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from "@material-ui/core";

import MovieItem from "./MovieItem";

const MoviesList = ({ data, onFetchMore, dataLength }) => {
  return (
    data &&
    data.length > 0 && (
      <InfiniteScroll dataLength={dataLength} next={onFetchMore} hasMore={true}>
        <Grid container justifyContent="space-around">
          {data.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <MovieItem key={index} data={movie} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    )
  );
};

export default MoviesList;
