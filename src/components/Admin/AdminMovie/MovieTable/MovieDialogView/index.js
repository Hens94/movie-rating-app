import React from "react";
import styled from "styled-components/macro";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Slide,
} from "@material-ui/core";

const MoviePoster = styled.img`
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
`;

const MovieLabel = styled.span`
  font-weight: 400;
  color: ${(props) => props.theme.palette.primary.main};
  margin: ${(props) => props.theme.spacing(2)}px
    ${(props) => props.theme.spacing(2)}px 0
    ${(props) => props.theme.spacing(2)}px;
  text-transform: uppercase;
`;

const MovieValue = styled.span`
  margin: ${(props) => props.theme.spacing(1)}px
    ${(props) => props.theme.spacing(2)}px;
  text-align: justify;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MovieProperty = ({ label, value, isLink = false }) => (
  <Grid container direction="column" item xs={12}>
    <MovieLabel>{label}</MovieLabel>
    <MovieValue>
      {isLink ? (
        <a href={value} target="blank">
          {value}
        </a>
      ) : (
        value
      )}
    </MovieValue>
  </Grid>
);

const MovieDialogView = ({ data, open, onClose }) => {
  const {
    title,
    description,
    genre,
    year,
    imdb_id: imdbUrl,
    poster_url: posterImage,
    user_created: userCreated,
  } = data;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth={"md"}
    >
      <DialogContent>
        <Grid container spacing={3}>
          <Grid container justifyContent="center" item sm={12} md={6} lg={4}>
            <MoviePoster src={posterImage} alt={title} />
            <MovieLabel>Poster</MovieLabel>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            item
            sm={12}
            md={6}
            lg={8}
          >
            <MovieProperty label={"Title"} value={title} />
            <MovieProperty label={"Description"} value={description} />
            <MovieProperty label={"Year"} value={year} />
            <MovieProperty label={"Genre"} value={genre.toString()} />
            <MovieProperty label={"IMDb Url"} value={imdbUrl} isLink />
            <MovieProperty label={"Created by"} value={userCreated} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieDialogView;
