import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

function ManagerFacade() {
  const getUpcoming = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/managers/interviews/upcoming", request);
  };

  const getPrevious = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/managers/interviews/previous", request);
  };

  const getEmployeesByManager = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/managers/employees", request);
  };

  const getManagersByUser = (user) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/managers/" + user, request);
  };

  return { getUpcoming, getPrevious, getEmployeesByManager, getManagersByUser };
}

const managerFacade = ManagerFacade();
export default managerFacade;
