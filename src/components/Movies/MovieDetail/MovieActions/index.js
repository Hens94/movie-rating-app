import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import styled from "styled-components/macro";
import {
  Plus as PlusIcon,
  Minus as MinusIcon,
  Star as StarIcon,
  MessageCircle as MessageCircleIcon,
  ExternalLink as ExternalLinkIcon,
} from "react-feather";

import DialogRating from "./DialogRating";
import DialogComment from "./DialogComment";

const ActionButtonContainer = styled(Grid)`
  padding: ${(props) => props.theme.spacing(4)}px;
`;

const ActionButton = styled(Button)`
  margin: ${(props) => props.theme.spacing(2)}px;
  text-transform: uppercase;
`;

const MovieActions = ({
  data,
  userRating,
  onRating,
  onRefresh,
  isInWatchList,
  onChangeWatchList,
}) => {
  const [openRateDialog, setOpenRateDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const handleRating = (rating) => {
    onRating(rating, null, onRefresh);
    setOpenRateDialog(false);
  };

  const handleComment = (comment) => {
    onRating(null, comment);
    setOpenCommentDialog(false);
  };

  const handleOpenRateDialog = () => {
    setOpenRateDialog(true);
  };

  const handleOpenCommentDialog = () => {
    setOpenCommentDialog(true);
  };

  const handleCloseRateDialog = () => {
    setOpenRateDialog(false);
  };

  const handleCloseCommentDialog = () => {
    setOpenCommentDialog(false);
  };

  const { title, imdb_id: imdb } = data;

  const isRated = !!userRating && !!userRating.score;
  const isComment = !!userRating && !!userRating.comment;

  return (
    <>
      <ActionButtonContainer
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        item
        xs={12}
        sm={12}
        md={5}
        lg={4}
        xl={3}
      >
        <ActionButton
          variant="outlined"
          color="primary"
          fullWidth
          component="a"
          href={imdb}
          target="_blank"
          startIcon={<ExternalLinkIcon />}
        >
          Go to IMDb
        </ActionButton>
        <ActionButton
          variant={isRated ? "outlined" : "contained"}
          color="primary"
          fullWidth
          onClick={handleOpenRateDialog}
          startIcon={<StarIcon />}
        >
          {isRated ? "Edit rating" : "Rate"}
        </ActionButton>
        <ActionButton
          variant={isComment ? "outlined" : "contained"}
          color="primary"
          fullWidth
          onClick={handleOpenCommentDialog}
          startIcon={<MessageCircleIcon />}
        >
          {isComment ? "Edit comment" : "Comment"}
        </ActionButton>
        <ActionButton
          variant={isInWatchList ? "outlined" : "contained"}
          color="primary"
          fullWidth
          startIcon={isInWatchList ? <MinusIcon /> : <PlusIcon />}
          onClick={onChangeWatchList}
        >
          {isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
        </ActionButton>
      </ActionButtonContainer>

      <DialogRating
        movieTitle={title}
        open={openRateDialog}
        ratingValue={userRating ? userRating.score : 0}
        onRating={handleRating}
        onClose={handleCloseRateDialog}
      />
      <DialogComment
        movieTitle={title}
        open={openCommentDialog}
        commentValue={userRating ? userRating.comment : ""}
        onComment={handleComment}
        onClose={handleCloseCommentDialog}
      />
    </>
  );
};

export default MovieActions;
