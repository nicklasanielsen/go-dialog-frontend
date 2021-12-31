import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

function UserFacade() {
  const getProfileDetails = (user) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/user/" + user, request);
  };

  const getUpcomingInterviewsByUser = (user) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/interview/upcoming/" + user, request);
  };

  const getPreviousInterviewsByUser = (user) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/interview/previous/" + user, request);
  };

  const getByEmail = (email) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/user/find/email/" + email, request);
  };

  return {
    getProfileDetails,
    getUpcomingInterviewsByUser,
    getPreviousInterviewsByUser,
    getByEmail,
  };
}

const userFacade = UserFacade();
export default userFacade;
