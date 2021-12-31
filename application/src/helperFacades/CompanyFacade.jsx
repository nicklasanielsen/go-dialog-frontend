import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

function CompanyFacade() {
  const getManagersByCompany = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/company/managers", request);
  };

  const getUsersByCompany = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/company/employees", request);
  };

  const getAll = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/company/all", request);
  };

  const deleteCompany = (company, recaptcha) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("DELETE", null, token, recaptcha);

    return apiFacade.submitRequest("/company/" + company, request);
  };

  const getCompanyById = (company) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/company/" + company, request);
  };

  const updateCompany = (id, name, cvr, recaptcha) => {
    let token = tokenFacade.getToken();

    const body = {
      name: name,
      cvr: cvr,
    };

    const request = apiFacade.prepareRequest("PUT", body, token, recaptcha);

    return apiFacade.submitRequest("/company/" + id, request);
  };

  const getCompanyByUser = (user) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/company/user/" + user, request);
  };

  return {
    getManagersByCompany,
    getUsersByCompany,
    getAll,
    deleteCompany,
    getCompanyById,
    updateCompany,
    getCompanyByUser,
  };
}

const companyFacade = CompanyFacade();
export default companyFacade;
