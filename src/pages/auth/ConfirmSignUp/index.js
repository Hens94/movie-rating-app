import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import "yup-phone";
import { Formik } from "formik";
import {
  confirmSignUp,
  resendConfirmationCode,
} from "../../../redux/actions/authActions";

import {
  Button,
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

function ConfirmSignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { signUpUsername } = useParams();

  const handleResendCode = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        resendConfirmationCode({
          username: signUpUsername,
        })
      );
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  return (
    <Wrapper>
      <Helmet title="Sign Up" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Sign up confirmation
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Check your email to get the verification code
      </Typography>

      <Formik
        initialValues={{
          verificationCode: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          verificationCode: Yup.string().required(
            "Verification code is required"
          ),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              confirmSignUp({
                username: signUpUsername,
                verificationCode: values.verificationCode,
              })
            );
            history.push("/auth/sign-in");
          } catch (error) {
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
            {(errors.submit || errorMessage) && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit || errorMessage}
              </Alert>
            )}
            <TextField
              type="text"
              name="verificationCode"
              label="Verification code"
              value={values.verificationCode}
              error={Boolean(
                touched.verificationCode && errors.verificationCode
              )}
              fullWidth
              helperText={touched.verificationCode && errors.verificationCode}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Button color="primary" fullWidth onClick={handleResendCode}>
              Resend code
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Confirm
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default ConfirmSignUp;
