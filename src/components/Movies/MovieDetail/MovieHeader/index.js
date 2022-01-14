import { Typography, Grid } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { Star } from "react-feather";

const MovieYearLable = styled(Typography)(spacing);

const RatingLabel = styled(Typography)(spacing);

const StarIcon = styled(Star)`
  color: #e3bf00;
  margin-right: 6px;
`;

const MovieSubHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1rem;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing(2)}px;
  gap: ${(props) => props.theme.spacing(2)}px;
`;

const MovieRatingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;
  width: 100%;
  height: 100%;
  color: #e3bf00;
`;

const MovieRatingItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${(props) => props.theme.spacing(4)}px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 10px;
  }
`;

const MovieRatingItemTitle = styled.h1`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.4);
  margin: 0;
  text-transform: uppercase;
`;

const MovieRatingItemInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MovieHeader = ({ data, userRating }) => {
  const { title, year, rating_avg: rating } = data;

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h1"
            gutterBottom
            display="inline"
            color="primary"
          >
            {title}
          </Typography>

          <MovieSubHeader>
            <MovieYearLable variant="h5">{year}</MovieYearLable>
          </MovieSubHeader>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MovieRatingContainer>
            <MovieRatingItem>
              <MovieRatingItemTitle>Rating</MovieRatingItemTitle>
              <MovieRatingItemInfo>
                <StarIcon size={25} />

                <RatingLabel mr={1} variant="h3" component="span">
                  {rating}
                </RatingLabel>
                <RatingLabel variant="subtitle1" component="span">
                  / 5
                </RatingLabel>
              </MovieRatingItemInfo>
            </MovieRatingItem>
            <MovieRatingItem>
              <MovieRatingItemTitle>Your Rating</MovieRatingItemTitle>
              <MovieRatingItemInfo>
                <StarIcon size={25} />

                <RatingLabel mr={1} variant="h3" component="span">
                  {userRating ? userRating : "?"}
                </RatingLabel>
                <RatingLabel variant="subtitle1" component="span">
                  / 5
                </RatingLabel>
              </MovieRatingItemInfo>
            </MovieRatingItem>
          </MovieRatingContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieHeader;
