import jwt_decode from "jwt-decode";

function TokenFacade() {
  const setToken = (token) => {
    localStorage.setItem("token", token);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  const decodeToken = (token) => {
    return jwt_decode(token, { complete: true });
  };

  let getDecodedToken = () => {
    let token = getToken();

    if (token) {
      return decodeToken(token);
    }

    return null;
  };

  const isValid = () => {
    const token = getToken();

    if (token) {
      const decodedToken = decodeToken(token);
      const now = new Date().getTime() / 1000;

      if (decodedToken.exp < now) {
        removeToken();
        return false;
      }

      return true;
    }

    return false;
  };

  return { setToken, getToken, removeToken, getDecodedToken, isValid };
}

const tokenFacade = TokenFacade();
export default tokenFacade;
