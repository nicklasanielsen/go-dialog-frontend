import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

function HRFacade() {
  const getUpcoming = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/hr/interviews/upcoming", request);
  };

  const getPrevious = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/hr/interviews/previous", request);
  };

  const invite = (email, recaptcha) => {
    let token = tokenFacade.getToken();
    const body = { email: email };

    const request = apiFacade.prepareRequest("POST", body, token, recaptcha);

    return apiFacade.submitRequest("/hr/invite", request);
  };

  const addManager = (manager, employee) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest(
      "/user/" + employee + "/add_manager/" + manager,
      request
    );
  };

  const removeManager = (manager, employee, recaptcha) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, recaptcha);

    return apiFacade.submitRequest(
      "/user/" + employee + "/remove_manager/" + manager,
      request
    );
  };

  return { getUpcoming, getPrevious, invite, addManager, removeManager };
}

const hrFacade = HRFacade();
export default hrFacade;
