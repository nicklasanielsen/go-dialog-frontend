import authFacade from "./helperFacades/AuthFacade";
import companyFacade from "./helperFacades/CompanyFacade";
import employeeFacade from "./helperFacades/EmployeeFacade";
import hrFacade from "./helperFacades/HRFacade";
import interviewFacade from "./helperFacades/InterviewFacade";
import interviewTemplateFacade from "./helperFacades/InterviewTemplateFacade";
import managerFacade from "./helperFacades/ManagerFacade";
import questionTemplateFacade from "./helperFacades/QuestionTemplateFacade";
import tokenFacade from "./helperFacades/TokenFacade";
import userFacade from "./helperFacades/UserFacade";

function Facade() {
  /** Auth related */
  const login = (email, password, recaptcha) => {
    return authFacade.login(email, password, recaptcha);
  };

  const register = (
    firstname,
    middlename,
    lastname,
    email,
    password,
    recaptcha
  ) => {
    return authFacade.register(
      firstname,
      middlename,
      lastname,
      email,
      password,
      recaptcha
    );
  };

  const registerUser = (
    firstname,
    middlename,
    lastname,
    email,
    password,
    companyID,
    recaptcha
  ) => {
    return authFacade.registerUser(
      firstname,
      middlename,
      lastname,
      email,
      password,
      companyID,
      recaptcha
    );
  };

  const isLoggedIn = () => {
    return authFacade.isLoggedIn();
  };

  const isAdmin = () => {
    return authFacade.isAdmin();
  };

  const isHR = () => {
    return authFacade.isHR();
  };

  const isManager = () => {
    return authFacade.isManager();
  };

  const logout = () => {
    authFacade.logout();
  };

  const accountAndCompanyActivation = (
    userID,
    activationCode,
    cvr,
    name,
    recaptcha
  ) => {
    return authFacade.accountAndCompanyActivation(
      userID,
      activationCode,
      cvr,
      name,
      recaptcha
    );
  };

  const accountActivation = (userID, activationCode) => {
    return authFacade.accountActivation(userID, activationCode);
  };

  const requestAccountRecovery = (email, recaptcha) => {
    return authFacade.requestAccountRecovery(email, recaptcha);
  };

  const processAccountRecovery = (
    userID,
    recoveryCode,
    password,
    recaptcha
  ) => {
    return authFacade.processAccountRecovery(
      userID,
      recoveryCode,
      password,
      recaptcha
    );
  };

  /** Employee Related */
  const getUpcoming = () => {
    return employeeFacade.getUpcoming();
  };

  const getPrevious = () => {
    return employeeFacade.getPrevious();
  };

  /** HR Related */
  const getHRUpcoming = () => {
    return hrFacade.getUpcoming();
  };

  const getHRPrevious = () => {
    return hrFacade.getPrevious();
  };

  const invite = (email, recaptcha) => {
    return hrFacade.invite(email, recaptcha);
  };

  const addManager = (manager, employee) => {
    return hrFacade.addManager(manager, employee);
  };

  const removeManager = (manager, employee, recaptcha) => {
    return hrFacade.removeManager(manager, employee, recaptcha);
  };

  /** Manager Related */
  const getManagerUpcoming = () => {
    return managerFacade.getUpcoming();
  };

  const getManagerPrevious = () => {
    return managerFacade.getPrevious();
  };

  const getEmployeesByManager = () => {
    return managerFacade.getEmployeesByManager();
  };

  const getManagersByUser = (user) => {
    return managerFacade.getManagersByUser(user);
  };

  /** Company Related */
  const getManagersByCompany = () => {
    return companyFacade.getManagersByCompany();
  };

  const getUsersByCompany = () => {
    return companyFacade.getUsersByCompany();
  };

  const getAllCompanies = () => {
    return companyFacade.getAll();
  };

  const deleteCompany = (company, recaptcha) => {
    return companyFacade.deleteCompany(company, recaptcha);
  };

  const getCompanyById = (company) => {
    return companyFacade.getCompanyById(company);
  };

  const updateCompany = (id, name, cvr, recaptcha) => {
    return companyFacade.updateCompany(id, name, cvr, recaptcha);
  };

  const getCompanyByUser = (user) => {
    return companyFacade.getCompanyByUser(user);
  };

  /** User Related */
  const getProfileDetails = (user) => {
    return userFacade.getProfileDetails(user);
  };

  const getUpcomingInterviewsByUser = (user) => {
    return userFacade.getUpcomingInterviewsByUser(user);
  };

  const getPreviousInterviewsByUser = (user) => {
    return userFacade.getPreviousInterviewsByUser(user);
  };

  const getUserId = () => {
    return tokenFacade.getDecodedToken().user_id;
  };

  /** Interview Template Related */
  const getInterviewTemplates = () => {
    return interviewTemplateFacade.getInterviewTemplates();
  };

  const createInterviewTemplate = (
    name,
    amountOfManagers,
    amountOfEmployees,
    recaptcha
  ) => {
    return interviewTemplateFacade.createInterviewTemplate(
      name,
      amountOfManagers,
      amountOfEmployees,
      recaptcha
    );
  };

  const deleteInterviewTemplate = (template, recaptcha) => {
    return interviewTemplateFacade.deleteInterviewTemplate(template, recaptcha);
  };

  const getInterviewTemplateById = (template) => {
    return interviewTemplateFacade.getInterviewTemplateById(template);
  };

  const addQuestionToTemplate = (template, question) => {
    return interviewTemplateFacade.addQuestionToTemplate(template, question);
  };

  const removeQuestionFromTemplate = (template, question) => {
    return interviewTemplateFacade.removeQuestionFromTemplate(
      template,
      question
    );
  };

  const updateTemplate = (
    template,
    name,
    amount_of_managers,
    amount_of_employees
  ) => {
    return interviewTemplateFacade.updateTemplate(
      template,
      name,
      amount_of_managers,
      amount_of_employees
    );
  };

  /** Question Template Related */
  const getQuestionTemplates = () => {
    return questionTemplateFacade.getQuestionTemplates();
  };

  const getQuestionTemplateById = (id) => {
    return questionTemplateFacade.getQuestionTemplateById(id);
  };

  const createQuestionTemplate = (name, question, recaptcha) => {
    return questionTemplateFacade.createQuestionTemplate(
      name,
      question,
      recaptcha
    );
  };

  const deleteQuestionTemplate = (question, recaptcha) => {
    return questionTemplateFacade.deleteQuestionTemplate(question, recaptcha);
  };

  const updateQuestion = (id, name, question, recaptcha) => {
    return questionTemplateFacade.updateQuestion(id, name, question, recaptcha);
  };

  /** Interview Related */
  const createInterview = (user, template, date, time, recaptcha) => {
    return interviewFacade.createInterview(
      user,
      template,
      date,
      time,
      recaptcha
    );
  };

  const deleteInterview = (interview, recaptcha) => {
    return interviewFacade.deleteInterview(interview, recaptcha);
  };

  const sendInterviewInvitation = (interview, recaptcha) => {
    return interviewFacade.sendInterviewInvitation(interview, recaptcha);
  };

  const getInterviewById = (interview) => {
    return interviewFacade.getInterviewById(interview);
  };

  const answerQuestions = (interview, summary, answers, recaptcha) => {
    return interviewFacade.answerQuestions(
      interview,
      summary,
      answers,
      recaptcha
    );
  };

  return {
    /** Auth related */
    login,
    register,
    registerUser,
    isLoggedIn,
    isAdmin,
    isHR,
    isManager,
    logout,
    accountAndCompanyActivation,
    accountActivation,
    requestAccountRecovery,
    processAccountRecovery,
    /** Employee Related */
    getUpcoming,
    getPrevious,
    /** HR Related */
    getHRUpcoming,
    getHRPrevious,
    invite,
    addManager,
    removeManager,
    /** Manager Related */
    getManagerUpcoming,
    getManagerPrevious,
    getEmployeesByManager,
    getManagersByUser,
    /** Company Related */
    getManagersByCompany,
    getUsersByCompany,
    getCompanyById,
    getAllCompanies,
    deleteCompany,
    updateCompany,
    getCompanyByUser,
    /** User Related */
    getProfileDetails,
    getUpcomingInterviewsByUser,
    getPreviousInterviewsByUser,
    getUserId,
    /** Interview Template Related */
    getInterviewTemplates,
    createInterviewTemplate,
    deleteInterviewTemplate,
    getInterviewTemplateById,
    addQuestionToTemplate,
    removeQuestionFromTemplate,
    updateTemplate,
    /** Question Template Related */
    getQuestionTemplates,
    getQuestionTemplateById,
    createQuestionTemplate,
    deleteQuestionTemplate,
    updateQuestion,
    /** Interview Related */
    createInterview,
    deleteInterview,
    sendInterviewInvitation,
    getInterviewById,
    answerQuestions,
  };
}

const facade = Facade();
export default facade;
