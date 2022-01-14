import React, { useState } from "react";
import {
  Button,
  Dialog,
  Slide,
  DialogContent as MuiDialogContent,
  DialogContentText,
} from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components/macro";
import { Star as StarIcon } from "react-feather";

const DialogIconStar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const DialogStar = styled(StarIcon)`
  width: 4rem;
  height: 4rem;
  color: ${(props) => props.theme.palette.primary.main};
`;

const DialogRateTitle = styled(DialogContentText)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: bold;
  font-size: 0.8rem;
  text-align: center;
  margin: 0;
`;

const DialogRateMovie = styled(DialogContentText)`
  font-weight: 400;
  font-size: 1rem;
  text-align: center;
  color: #000;
  margin: 0;
`;

const DialogContent = styled(MuiDialogContent)`
  margin: ${(props) => props.theme.spacing(8)}px
    ${(props) => props.theme.spacing(12)}px;
`;

const DialogRateButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing(6)}px;
  text-transform: uppercase;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogRating = ({ movieTitle, open, ratingValue, onRating, onClose }) => {
  const [rating, setRating] = useState(ratingValue ? ratingValue : 0);

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const handleRating = () => {
    onRating(rating);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-labelledby="rate-dialog-title"
      aria-describedby="rate-dialog-description"
    >
      <DialogContent>
        <DialogIconStar>
          <DialogStar />
        </DialogIconStar>

        <DialogRateTitle id="rate-dialog-title">Rate this</DialogRateTitle>
        <DialogRateMovie id="rate-dialog-description">
          {movieTitle}
        </DialogRateMovie>
        <ReactStars
          count={5}
          onChange={handleRatingChange}
          value={ratingValue}
          size={60}
          activeColor="#ffd700"
        />
        <DialogRateButton
          onClick={handleRating}
          color="primary"
          variant="contained"
          fullWidth
        >
          Rate
        </DialogRateButton>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRating;
