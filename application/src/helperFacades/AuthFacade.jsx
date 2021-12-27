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

  const accountAndCompanyActivation = (
    userID,
    activationCode,
    cvr,
    name,
    recaptcha
  ) => {
    const body = {
      userID: userID,
      activationCode: activationCode,
      cvr: cvr,
      name: name,
    };

    const request = apiFacade.prepareRequest("POST", body, null, recaptcha);

    return apiFacade.submitRequest("/auth/account-activation/company", request);
  };

  const requestAccountRecovery = (email, recaptcha) => {
    const body = { email: email };

    const request = apiFacade.prepareRequest("POST", body, null, recaptcha);

    return apiFacade.submitRequest("/auth/account-recovery/request", request);
  };

  const processAccountRecovery = (
    userID,
    recoveryCode,
    password,
    recaptcha
  ) => {
    const body = {
      user_id: userID,
      recovery_code: recoveryCode,
      password: password,
    };

    const request = apiFacade.prepareRequest("POST", body, null, recaptcha);

    return apiFacade.submitRequest("/auth/account-recovery/process", request);
  };

  return {
    login,
    logout,
    register,
    isLoggedIn,
    isAdmin,
    isHR,
    isManager,
    accountAndCompanyActivation,
    requestAccountRecovery,
    processAccountRecovery,
  };
}

const authFacade = AuthFacade();
export default authFacade;
