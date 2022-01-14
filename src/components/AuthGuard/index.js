import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuthenticatedUser, signOut } from "../../redux/actions/authActions";

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.authReducer);

  const handleSignOut = useCallback(async () => {
    await dispatch(signOut());
    history.push("/");
  }, [dispatch, history]);

  useEffect(() => {
    if (!auth.user) {
      dispatch(getAuthenticatedUser()).catch(() => {
        handleSignOut();
      });
    }
  }, [dispatch, auth.user, handleSignOut]);

  return children;
};

export default AuthGuard;
