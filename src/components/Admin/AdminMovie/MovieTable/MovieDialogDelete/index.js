import React from "react";
import styled from "styled-components/macro";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";

const ActionButton = styled(Button)`
  margin: ${(props) => props.theme.spacing(2)}px;
  width: 150px;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MovieDialogDelete = ({ data, onDelete, open, onClose }) => {
  const { id, title } = data;

  const handleSubmit = () => {
    onDelete(id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth="sm"
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item container justifyContent="center" xs={12}>
            <Typography variant="h4" color="primary">
              {`Are you sure you want to delete the movie ${title}?`}
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <ActionButton variant="contained" onClick={onClose}>
              No
            </ActionButton>
            <ActionButton
              style={{ backgroundColor: "red", color: "#fff" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Yes, Delete it
            </ActionButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDialogDelete;
