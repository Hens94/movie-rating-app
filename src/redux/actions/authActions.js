import { Auth } from "aws-amplify";

import * as types from "../../constants";

export const signIn = ({ username, password }) => {
  return async (dispatch) => {
    dispatch({ type: types.AUTH_SIGN_IN_REQUEST });

    return Auth.signIn(username, password)
      .then((user) => {
        const {
          username: name,
          attributes: { email, phone_number: phoneNumber, sub: id },
        } = user;
        dispatch({
          type: types.AUTH_SIGN_IN_SUCCESS,
          id,
          email,
          name,
          phoneNumber,
        });
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_SIGN_IN_FAILURE });
        throw error;
      });
  };
};

export const getAuthenticatedUser = () => {
  return async (dispatch) => {
    return Auth.currentAuthenticatedUser()
      .then((user) => {
        const {
          username: name,
          attributes: { email, phone_number: phoneNumber, sub: id },
        } = user;
        dispatch({
          type: types.AUTH_GET_CURRENT_AUTHENTICATED_USER,
          id,
          email,
          name,
          phoneNumber,
        });

        return { user: { id, email, name, phoneNumber } };
      })
      .catch((error) => {
        signOut();
        throw error;
      });
  };
};

export function signUp(userInfo) {
  return async (dispatch) => {
    const { username, password, email, phoneNumber } = userInfo;

    return Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number: phoneNumber,
      },
    }).catch((error) => {
      throw error;
    });
  };
}

export function confirmSignUp(userInfo) {
  return async (dispatch) => {
    const { username, verificationCode } = userInfo;

    return Auth.confirmSignUp(username, verificationCode).catch((error) => {
      throw error;
    });
  };
}

export function resendConfirmationCode(userInfo) {
  return async (dispatch) => {
    const { username } = userInfo;

    return Auth.resendSignUp(username).catch((error) => {
      throw error;
    });
  };
}

export function signOut() {
  return async (dispatch) => {
    return Auth.signOut()
      .then(() => {
        dispatch({
          type: types.AUTH_SIGN_OUT,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function forgotPassword(username) {
  return async (dispatch) => {
    return Auth.forgotPassword(username).catch((error) => {
      throw error;
    });
  };
}

export function forgotPasswordSubmit(userInfo) {
  return async (dispatch) => {
    const { username, code, password } = userInfo;
    return Auth.forgotPasswordSubmit(username, code, password).catch(
      (error) => {
        throw error;
      }
    );
  };
}
