import { useEffect } from "react";
import { Grid } from "@material-ui/core";

import WatchListItem from "./WatchListItem";

import useWatchList from "../../hooks/useWatchList";

const WatchList = () => {
  const { watchList, loadWatchList, removeWatchList } = useWatchList();

  useEffect(() => {
    loadWatchList();
  }, [loadWatchList]);

  return (
    watchList &&
    watchList.length > 0 && (
      <Grid container justifyContent="space-around">
        {watchList.map(({ id, movie_info: movie }, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <WatchListItem
              key={index}
              id={id}
              data={movie}
              onRemove={removeWatchList}
            />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default WatchList;
