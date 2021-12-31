import { Route, Redirect, useLocation } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  isLoggedIn,
  isAuthenticated,
  recaptchaRef,
  ...rest
}) {
  const { pathname } = useLocation();

  return (
    <Route exact {...rest}>
      {isLoggedIn ? (
        isAuthenticated ? (
          <Component recaptchaRef={recaptchaRef} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: pathname } }} />
        )
      ) : (
        <Redirect to={{ pathname: "", state: { from: pathname } }} />
      )}
    </Route>
  );
}
