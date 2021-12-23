import tokenFacade from "./TokenFacade";
import apiFacade from "./APIFacade";

function AuthFacade() {
  const login = (email, password, recaptcha) => {
    const body = {
      email: email,
      password: password,
    };

    const request = apiFacade.prepareRequest("POST", body, null, recaptcha);

    return apiFacade.submitRequest("/auth/login", request);
  };

  const logout = () => {
    return;
  };

  const register = (
    firstname,
    middlename,
    lastname,
    email,
    password,
    recaptcha
  ) => {
    const body = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      password: password,
    };

    const request = apiFacade.prepareRequest("POST", body, null, recaptcha);

    return apiFacade.submitRequest("/auth/register", request);
  };

  const isLoggedIn = () => {
    return false;
  };

  const isAdmin = () => {
    return false;
  };

  const isHR = () => {
    return false;
  };

  const isManager = () => {
    return false;
  };

  return { login, logout, register, isLoggedIn, isAdmin, isHR, isManager };
}

const authFacade = AuthFacade();
export default authFacade;
