import React from "react";
import styled from "styled-components/macro";
import { Paper, Grid, Avatar, Typography } from "@material-ui/core";
import { parseJSON, formatDistanceToNow } from "date-fns";
import { spacing } from "@material-ui/system";
import { Star } from "react-feather";

const CommentItem = styled(Grid)`
  padding: ${(props) => props.theme.spacing(4)}px !important;
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
`;

const UserFirstLetter = styled(Avatar)`
  margin: ${(props) => props.theme.spacing(2)}px;
  text-transform: uppercase;
`;

const Username = styled(Typography)`
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 500;
  font-size: 0.9rem;
  margin-right: ${(props) => props.theme.spacing(2)}px;
  text-transform: uppercase;
`;

const MovieRatingItemInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  color: #e3bf00;
`;

const RatingLabel = styled(Typography)(spacing);

const StarIcon = styled(Star)`
  color: #e3bf00;
  margin-right: 6px;
`;

const CommentTitle = styled(Typography)`
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const CommentDate = styled(Typography)`
  color: rgba(0, 0, 0, 0.4);
`;

const CommentContainer = styled(Grid)`
  width: 100%;
`;

const MovieComment = ({ data }) => {
  if (!data || data.filter(({ comment }) => !!comment).length === 0)
    return null;

  const comments = data.filter(({ comment }) => !!comment);

  return (
    <>
      <CommentTitle variant="h3" color="primary">
        Comments
      </CommentTitle>
      <CommentContainer container direction="column">
        {comments.map(({ id, score, comment, user, created_at: createdAt }) => (
          <CommentItem
            container
            justifyContent="space-between"
            item
            key={id}
            component={Paper}
            elevation={3}
          >
            <Grid
              container
              item
              alignItems="center"
              justifyContent="flex-start"
              xs={8}
            >
              <UserFirstLetter>{user[0]}</UserFirstLetter>
              <Username component="span">{user}</Username>
              <Typography variant="body2">{comment}</Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              item
              xs={4}
            >
              <CommentDate variant="body2">
                {formatDistanceToNow(parseJSON(createdAt), {
                  addSuffix: true,
                })}
              </CommentDate>
              <MovieRatingItemInfo>
                <StarIcon size={25} />

                <RatingLabel mr={1} variant="h3" component="span">
                  {score ? score : "?"}
                </RatingLabel>
                <RatingLabel variant="subtitle1" component="span">
                  / 5
                </RatingLabel>
              </MovieRatingItemInfo>
            </Grid>
          </CommentItem>
        ))}
      </CommentContainer>
    </>
  );
};

export default MovieComment;
