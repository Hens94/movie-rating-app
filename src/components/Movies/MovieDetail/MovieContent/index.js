import {
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  Chip as MuiChip,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components/macro";

import MovieActions from "../MovieActions";
import MovieComment from "./MovieComment";

const MoviePoster = styled.img`
  width: 90%;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.6);
`;

const MovieContentContiner = styled(Grid)`
  padding: ${(props) => props.theme.spacing(8)}px;
`;

const MovieDescription = styled(Typography)`
  text-align: justify;
  font-size: 1rem;
  margin: ${(props) => props.theme.spacing(2)}px 0;
`;

const GenreLabel = styled.div`
  font-size: 0.6rem;
  white-space: nowrap;
  padding: ${(props) => props.theme.spacing(2)}px 0;
  width: 100%;
`;

const Chip = styled(MuiChip)`
  margin: ${(props) => props.theme.spacing(1)}px;
`;

const MovieContent = ({
  data,
  userRating,
  ratings,
  onRating,
  onRefresh,
  onChangeWatchList,
  isInWatchList,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  const { genre, description, poster_url: poster } = data;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="stretch"
      component={Paper}
    >
      <Grid
        container
        justifyContent={isXs ? "center" : "flex-start"}
        item
        xs={12}
        sm={6}
        md={5}
        lg={4}
        xl={3}
      >
        <MoviePoster src={poster} />
      </Grid>
      <MovieContentContiner container item xs={12} sm={6} md={7} lg={8} xl={9}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          item
          xs={12}
          sm={12}
          md={7}
          lg={8}
          xl={9}
        >
          <GenreLabel>
            {genre.map((item, index) => (
              <Chip
                key={index}
                label={item}
                color="primary"
                variant="outlined"
              />
            ))}
          </GenreLabel>
          <Typography variant="h3" color="primary">
            Summary
          </Typography>
          <MovieDescription variant="body1">{description}</MovieDescription>
        </Grid>
        <MovieActions
          data={data}
          userRating={userRating}
          onRating={onRating}
          onRefresh={onRefresh}
          isInWatchList={isInWatchList}
          onChangeWatchList={onChangeWatchList}
        />
        <MovieComment data={ratings} />
      </MovieContentContiner>
    </Grid>
  );
};

export default MovieContent;
