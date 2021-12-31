import apiFacade from "./APIFacade";
import tokenFacade from "./TokenFacade";

function InterviewFacade() {
  const createInterview = (user, template, date, time, recaptcha) => {
    let token = tokenFacade.getToken();

    const body = {
      user_id: user,
      template: template,
      date: date,
      time: time,
    };

    const request = apiFacade.prepareRequest("POST", body, token, recaptcha);

    return apiFacade.submitRequest("/interview", request);
  };

  const deleteInterview = (interview, recaptcha) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("DELETE", null, token, recaptcha);

    return apiFacade.submitRequest("/interview/" + interview, request);
  };

  const sendInterviewInvitation = (interview, recaptcha) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, recaptcha);

    return apiFacade.submitRequest(
      "/interview/" + interview + "/send_invitation",
      request
    );
  };

  const getInterviewById = (interview) => {
    let token = tokenFacade.getToken();

    const request = apiFacade.prepareRequest("GET", null, token, null);

    return apiFacade.submitRequest("/interview/" + interview, request);
  };

  const answerQuestions = (interview, summary, answers) => {
    let token = tokenFacade.getToken();

    const body = {
      summary: summary,
      questions: answers,
    };

    const request = apiFacade.prepareRequest("PUT", body, token, null);

    return apiFacade.submitRequest("/interview/" + interview, request);
  };

  return {
    createInterview,
    deleteInterview,
    sendInterviewInvitation,
    getInterviewById,
    answerQuestions,
  };
}

const interviewFacade = InterviewFacade();
export default interviewFacade;
