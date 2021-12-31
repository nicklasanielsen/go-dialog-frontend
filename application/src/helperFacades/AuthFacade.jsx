import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

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
    let token = tokenFacade.getToken();

    if (token !== undefined) {
      const request = apiFacade.prepareRequest("POST", null, token, null);

      apiFacade.submitRequest("/auth/logout", request);
    }

    tokenFacade.removeToken();
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

  const registerUser = (
    firstname,
    middlename,
    lastname,
    email,
    password,
    companyID,
    recaptcha
  ) => {
    const body = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      password: password,
      company_id: companyID,
    };

    const request = apiFacade.prepareRequest("POST", body, null, recaptcha);

    return apiFacade.submitRequest("/auth/register/new", request);
  };

  const renew = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("POST", null, token, null);

    apiFacade.submitRequest("/auth/activity", request);
  };

  const isLoggedIn = () => {
    let valid = tokenFacade.isValid();

    if (valid) {
      renew();
    }

    return valid;
  };

  const isAdmin = () => {
    let decodedToken = tokenFacade.getDecodedToken();

    if (decodedToken) {
      let roles = decodedToken.roles.split(",");
      return roles.includes("ADMIN");
    }

    return false;
  };

  const isHR = () => {
    let decodedToken = tokenFacade.getDecodedToken();

    if (decodedToken) {
      let roles = decodedToken.roles.split(",");
      return roles.includes("HR");
    }

    return false;
  };

  const isManager = () => {
    let decodedToken = tokenFacade.getDecodedToken();

    if (decodedToken) {
      let roles = decodedToken.roles.split(",");
      return roles.includes("MANAGER");
    }

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
      user_id: userID,
      activation_code: activationCode,
      cvr: cvr,
      name: name,
    };

    const request = apiFacade.prepareRequest("POST", body, null, recaptcha);

    return apiFacade.submitRequest("/auth/account-activation/company", request);
  };

  const accountActivation = (userID, activationCode) => {
    const body = {
      user_id: userID,
      activation_code: activationCode,
    };

    const request = apiFacade.prepareRequest("POST", body, null, null);

    return apiFacade.submitRequest("/auth/account-activation", request);
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
      new_password: password,
    };

    const request = apiFacade.prepareRequest("POST", body, null, recaptcha);

    return apiFacade.submitRequest("/auth/account-recovery/process", request);
  };

  return {
    login,
    logout,
    register,
    registerUser,
    isLoggedIn,
    isAdmin,
    isHR,
    isManager,
    accountAndCompanyActivation,
    accountActivation,
    requestAccountRecovery,
    processAccountRecovery,
  };
}

const authFacade = AuthFacade();
export default authFacade;
