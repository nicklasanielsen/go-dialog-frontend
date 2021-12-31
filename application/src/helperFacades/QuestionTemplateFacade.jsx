import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

function QuestionTemplateFacade() {
  const getQuestionTemplates = () => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/interview/question/template/all", request);
  };

  const getQuestionTemplateById = (id) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest(
      "/interview/question/template/" + id,
      request
    );
  };

  const createQuestionTemplate = (name, question, recaptcha) => {
    let token = tokenFacade.getToken();

    const body = {
      name: name,
      question: question,
    };

    const request = apiFacade.prepareRequest("POST", body, token, recaptcha);

    return apiFacade.submitRequest("/interview/question/template", request);
  };

  const deleteQuestionTemplate = (question, recaptcha) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("DELETE", null, token, recaptcha);

    return apiFacade.submitRequest(
      "/interview/question/template/" + question,
      request
    );
  };

  const updateQuestion = (id, name, question, recaptcha) => {
    let token = tokenFacade.getToken();

    const body = {
      name: name,
      question: question,
    };

    const request = apiFacade.prepareRequest("PUT", body, token, recaptcha);

    return apiFacade.submitRequest(
      "/interview/question/template/" + id,
      request
    );
  };

  return {
    getQuestionTemplates,
    getQuestionTemplateById,
    createQuestionTemplate,
    deleteQuestionTemplate,
    updateQuestion,
  };
}

const questionTemplateFacade = QuestionTemplateFacade();
export default questionTemplateFacade;
