import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

function EmployeeFacade() {
  const getUpcoming = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/interview/upcoming", request);
  };

  const getPrevious = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/interview/previous", request);
  };

  return { getUpcoming, getPrevious };
}

const employeeFacade = EmployeeFacade();
export default employeeFacade;
