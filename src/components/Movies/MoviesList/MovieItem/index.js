import React from "react";
import styled from "styled-components/macro";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { Chip as MuiChip, Button } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../../../../vendor/perfect-scrollbar.css";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(4)}px
    ${(props) => props.theme.spacing(6)}px;
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 30em;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const RaitingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: ${(props) => props.theme.palette.primary.main};
`;

const Chip = styled(MuiChip)`
  margin: ${(props) => props.theme.spacing(1)}px;
`;

const YearLabel = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.palette.primary.main};
`;

const TitleLabel = styled.h2`
  font-size: 1.2rem;
  color: ${(props) => props.theme.palette.primary.main};
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

const GenreLabel = styled(PerfectScrollbar)`
  font-size: 0.6rem;
  overflow: x-scroll;
  white-space: nowrap;
  padding: ${(props) => props.theme.spacing(2)}px 0;
  width: 100%;
`;

const MovieItem = ({ data }) => {
  const {
    id,
    title,
    genre,
    year,
    poster_url: poster,
    rating_avg: rating,
  } = data;
  return (
    <MovieContainer>
      <MoviePoster src={poster} />
      <RaitingContainer>
        <ReactStars
          count={5}
          value={rating}
          size={30}
          edit={false}
          activeColor="#e3bf00"
        />
        <span>{rating}</span>
      </RaitingContainer>
      <YearLabel>{year}</YearLabel>
      <TitleLabel>{title}</TitleLabel>
      <GenreLabel>
        {genre.map((item, index) => (
          <Chip
            key={index}
            size={"small"}
            label={item}
            color="primary"
            variant="outlined"
          />
        ))}
      </GenreLabel>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/movies/${id}`}
      >
        More
      </Button>
    </MovieContainer>
  );
};

export default MovieItem;
