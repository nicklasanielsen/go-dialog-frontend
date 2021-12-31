import { useState, createRef, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import NoRoute from "./components/NoRoute";
import PrivateRoute from "./components/PrivateRoute";
import facade from "./Facade";
import { Message } from "semantic-ui-react";
import AccountActivation from "./components/AccountActivation";
import ProcessAccountRecovery from "./components/ProcessAccountRecovery";
import ProcessAccountActivation from "./components/ProcessAccountActivation";
import AdminDashboard from "./components/AdminDashboard";
import HRDashboard from "./components/HRDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import ProcessInvite from "./components/ProcessInvite";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(facade.isLoggedIn());
  const recaptchaRef = createRef();
  const history = useHistory();

  const tokenValidationCheck = useCallback(() => {
    if (isLoggedIn) {
      let currentStatus = facade.isLoggedIn();

      if (!currentStatus) {
        setLoggedIn(false);
        facade.logout();
        history.push("/");
      }
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    const interval = setInterval(() => {
      tokenValidationCheck();
    }, 60 * 1000); /* every min */

    return () => clearInterval(interval);
  }, [tokenValidationCheck]);

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LfbEtgdAAAAAAd-B-VYHlT7LsuKhzWjwr9ttkau"
        size="invisible"
      />

      <Header
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isManager={facade.isManager()}
        isHR={facade.isHR()}
        isAdmin={facade.isAdmin()}
        recaptchaRef={recaptchaRef}
      />
      <Container className="mt-5 mb-5">
        <Message
          icon="info"
          header="VIGTIGT!"
          content="Dette er blot en demo, eftersom projektet er relateret til et skoleprojekt."
          floating
        />

        <Switch>
          <Route exact path="/">
            {isLoggedIn ? (
              <>{history.push("/dashboard")}</>
            ) : (
              <Home recaptchaRef={recaptchaRef} />
            )}
          </Route>

          <PrivateRoute
            path="/dashboard/admin"
            isLoggedIn={isLoggedIn}
            isAuthenticated={facade.isAdmin()}
            component={AdminDashboard}
            recaptchaRef={recaptchaRef}
          />

          <PrivateRoute
            path="/dashboard/hr"
            isLoggedIn={isLoggedIn}
            isAuthenticated={facade.isHR()}
            component={HRDashboard}
            recaptchaRef={recaptchaRef}
          />

          <PrivateRoute
            path="/dashboard/manager"
            isLoggedIn={isLoggedIn}
            isAuthenticated={facade.isManager()}
            component={ManagerDashboard}
            recaptchaRef={recaptchaRef}
          />

          <PrivateRoute
            path="/dashboard"
            isLoggedIn={isLoggedIn}
            isAuthenticated={isLoggedIn}
            component={Dashboard}
            recaptchaRef={recaptchaRef}
          />

          <Route path="/invite/:companyID">
            <ProcessInvite recaptchaRef={recaptchaRef} />
          </Route>

          <Route path="/account-activation/:userID/:activationCode/process">
            <ProcessAccountActivation />
          </Route>

          <Route path="/account-activation/:userID/:activationCode">
            <AccountActivation recaptchaRef={recaptchaRef} />
          </Route>

          <Route path="/account-recovery/:userID/:recoveryCode">
            <ProcessAccountRecovery recaptchaRef={recaptchaRef} />
          </Route>

          <Route>
            <NoRoute />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
