import { Switch } from "react-router-dom";
import { Route, Redirect, useLocation } from "react-router-dom";
import NoRoute from "./NoRoute";

export default function PrivateRoute({
  component: Component,
  isLoggedIn,
  isAuthenticated,
  recaptchaRef,
  ...rest
}) {
  const { pathname } = useLocation();

  return (
    <Switch>
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

      <Route>
        <NoRoute />
      </Route>
    </Switch>
  );
}
