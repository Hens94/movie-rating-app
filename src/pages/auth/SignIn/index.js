import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  signIn,
  getAuthenticatedUser,
} from "../../../redux/actions/authActions";

import {
  Checkbox,
  FormControlLabel,
  Button as MuiButton,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const Button = styled(MuiButton)`
  margin-top: ${(props) => props.theme.spacing(2)}px;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getAuthenticatedUser());
  }, [dispatch]);

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Helmet title="Sign In" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Welcome back!
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>

      <Formik
        initialValues={{
          username: "",
          password: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signIn({ username: values.username, password: values.password })
            );
            if (history.length > 0) {
              history.goBack();
            } else {
              history.push("/");
            }
          } catch (error) {
            if (error.code === "UserNotConfirmedException") {
              history.push(`/auth/confirm-sign-up/${values.username}`);
            }

            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              name="username"
              label="Username"
              value={values.username}
              error={Boolean(touched.username && errors.username)}
              fullWidth
              helperText={touched.username && errors.username}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              my={2}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
            <Button
              my={2}
              component={Link}
              to="/auth/sign-up"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
            <Button
              my={2}
              component={Link}
              to="/auth/reset-password"
              fullWidth
              color="primary"
            >
              Forgot password
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default SignIn;
