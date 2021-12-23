import { API_URL } from "../settings";
import tokenFacade from "./TokenFacade";

function ApiFacade() {
  function handleHttpErrors(res) {
    let token = res.headers.get("Authentication");

    if (token !== null) {
      tokenFacade.setToken(token);
    }

    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        fullError: res.json(),
      });
    }

    return res.json();
  }

  const prepareRequest = (method, body, token, recaptcha) => {
    const request = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };

    if (token) {
      request.headers["Authentication"] = token;
    }

    if (recaptcha) {
      request.headers["Recaptcha"] = recaptcha;
    }

    if (body) {
      request.body = JSON.stringify(body);
    }

    return request;
  };

  const submitRequest = async (endpoint, request) => {
    return fetch(API_URL + endpoint, request).then(handleHttpErrors);
  };

  return { prepareRequest, submitRequest };
}

const apiFacade = ApiFacade();
export default apiFacade;
