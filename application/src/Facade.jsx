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

  return {
    /** Auth related */
    login,
    register,
    isLoggedIn,
    isAdmin,
    isHR,
    isManager,
    logout,
  };
}

const facade = Facade();
export default facade;
