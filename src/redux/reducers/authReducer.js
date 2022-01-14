import * as types from "../../constants";

export default function reducer(state = {}, actions) {
  switch (actions.type) {
    case types.AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        user: {
          id: actions.id,
          name: actions.name,
          email: actions.email,
          phoneNumber: actions.phoneNumber,
        },
      };
    case types.AUTH_GET_CURRENT_AUTHENTICATED_USER:
      return {
        ...state,
        user: {
          id: actions.id,
          name: actions.name,
          email: actions.email,
          phoneNumber: actions.phoneNumber,
        },
      };
    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        user: undefined,
      };

    default:
      return state;
  }
}
