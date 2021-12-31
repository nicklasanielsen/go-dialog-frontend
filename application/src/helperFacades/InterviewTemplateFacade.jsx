import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

function InterviewTemplateFacade() {
  const getInterviewTemplates = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/interview/template/all", request);
  };

  const createInterviewTemplate = (
    name,
    amountOfManagers,
    amountOfEmployees,
    recaptcha
  ) => {
    let token = tokenFacade.getToken();

    const body = {
      name: name,
      amount_of_managers: amountOfManagers,
      amount_of_employees: amountOfEmployees,
    };

    const request = apiFacade.prepareRequest("POST", body, token, recaptcha);

    return apiFacade.submitRequest("/interview/template", request);
  };

  const deleteInterviewTemplate = (template, recaptcha) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("DELETE", null, token, recaptcha);

    return apiFacade.submitRequest("/interview/template/" + template, request);
  };

  const getInterviewTemplateById = (template) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/interview/template/" + template, request);
  };

  const addQuestionToTemplate = (template, question) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest(
      "/interview/template/" + template + "/add_question/" + question,
      request
    );
  };

  const removeQuestionFromTemplate = (template, question) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest(
      "/interview/template/" + template + "/remove_question/" + question,
      request
    );
  };

  const updateTemplate = (
    template,
    name,
    amount_of_managers,
    amount_of_employees
  ) => {
    let token = tokenFacade.getToken();

    const body = {
      name: name,
      amount_of_managers_allowed: amount_of_managers,
      amount_of_employees_allowed: amount_of_employees,
    };

    const request = apiFacade.prepareRequest("PUT", body, token, null);

    return apiFacade.submitRequest("/interview/template/" + template, request);
  };

  return {
    getInterviewTemplates,
    createInterviewTemplate,
    deleteInterviewTemplate,
    getInterviewTemplateById,
    addQuestionToTemplate,
    removeQuestionFromTemplate,
    updateTemplate,
  };
}

const interviewTemplateFacade = InterviewTemplateFacade();
export default interviewTemplateFacade;
