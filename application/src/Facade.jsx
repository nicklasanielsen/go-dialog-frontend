import authFacade from "./helperFacades/AuthFacade";

function Facade() {
  /** Auth related */
  const login = (email, password, recaptcha) => {
    return authFacade.login(email, password, recaptcha);
  };

  const register = (
    firstname,
    middlename,
    lastname,
    email,
    password,
    recaptcha
  ) => {
    return authFacade.register(
      firstname,
      middlename,
      lastname,
      email,
      password,
      recaptcha
    );
  };

  const isLoggedIn = () => {
    return authFacade.isLoggedIn();
  };

  const isAdmin = () => {
    return authFacade.isAdmin();
  };

  const isHR = () => {
    return authFacade.isHR();
  };

  const isManager = () => {
    return authFacade.isManager();
  };

  const logout = () => {
    authFacade.logout();
  };

  const accountAndCompanyActivation = (
    userID,
    activationCode,
    cvr,
    name,
    recaptcha
  ) => {
    return authFacade.accountAndCompanyActivation(
      userID,
      activationCode,
      cvr,
      name,
      recaptcha
    );
  };

  const requestAccountRecovery = (email, recaptcha) => {
    return authFacade.requestAccountRecovery(email, recaptcha);
  };

  const processAccountRecovery = (
    userID,
    recoveryCode,
    password,
    recaptcha
  ) => {
    return authFacade.processAccountRecovery(
      userID,
      recoveryCode,
      password,
      recaptcha
    );
  };

  return {
    /** Auth related */
    login,
    register,
    isLoggedIn,
    isAdmin,
    isHR,
    isManager,
    logout,
    accountAndCompanyActivation,
    requestAccountRecovery,
    processAccountRecovery,
  };
}

const facade = Facade();
export default facade;
