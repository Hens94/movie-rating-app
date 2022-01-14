import React, { useEffect } from "react";
import styled from "styled-components/macro";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
} from "@material-ui/core";
import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import { useForm, useWatch, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useGenre from "../../../../../hooks/useGenre";

const DEFAULT_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const DEFAULT_FORM_DATA = {
  title: "",
  description: "",
  genre: [],
  year: "",
  imdb_id: "",
  poster_url: "",
};

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  genre: Yup.array().of(Yup.object()).required("Genre is required"),
  year: Yup.number().required("Year is required"),
  imdb_id: Yup.string().url(),
  poster_url: Yup.string().url().required("Poster URL is required"),
});

const Autocomplete = styled(MuiAutocomplete)`
  .MuiChip-root {
    height: 22px;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
  .MuiChip-deleteIcon {
    height: 18px;
    width: 18px;
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

const PosterImage = styled.img`
  width: 100%;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getDefautlFormData = (data) =>
  !!data
    ? {
        ...data,
        genre: [],
      }
    : DEFAULT_FORM_DATA;

const MovieDialogCreateEdit = ({ onSubmit, open, onClose, data }) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: getDefautlFormData(data),
    resolver: yupResolver(schema),
  });
  const { genres } = useGenre();
  const posterImage = useWatch({
    control,
    name: "poster_url",
    defaultValue: getDefautlFormData(data).poster_url,
  });

  useEffect(() => {
    if (data && genres && genres.length > 0) {
      setValue(
        "genre",
        genres.filter(({ name }) => data.genre.includes(name))
      );
    }
  }, [data, setValue, genres]);

  const handleSubmitForm = (dataForm) => {
    const { genre, ...restData } = dataForm;
    const request = { ...restData, genre: genre.map(({ id }) => id) };
    !!data ? onSubmit(data.id, request) : onSubmit(request);

    reset(getDefautlFormData(data));
    onClose();
  };

  const handleClose = () => {
    reset(getDefautlFormData(data));
    onClose();
  };

  const handleErrorForm = (error) => {
    console.error(error);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      scroll="paper"
    >
      <form onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}>
        <DialogTitle>Create Movie</DialogTitle>
        <DialogContent>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} md={8} container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Title"
                      fullWidth
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={3}
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="genre"
                  control={control}
                  defaultValue={[]}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <Autocomplete
                      multiple
                      options={genres}
                      onChange={(_, item) => {
                        onChange(item);
                      }}
                      value={value}
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Genre"
                          placeholder="Search for a genre"
                          fullWidth
                          error={isTouched && invalid}
                          helperText={isTouched && invalid && error.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="year"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Year"
                      fullWidth
                      type="number"
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="imdb_id"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="IMDb URL"
                      fullWidth
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="poster_url"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Poster URL"
                      fullWidth
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <PosterImage src={posterImage ? posterImage : DEFAULT_IMAGE} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" color="primary" disabled={!isValid}>
            {data ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MovieDialogCreateEdit;
