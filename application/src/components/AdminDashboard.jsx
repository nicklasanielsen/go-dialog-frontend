import { Tabs, Tab, Table, Modal } from "react-bootstrap";
import { Image, Loader, Segment, Button, Icon } from "semantic-ui-react";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import facade from "../Facade";
import CreateTemplate from "./CreateTemplate";
import CreateQuestionTemplate from "./CreateQuestionTemplate";
import TemplateView from "./TemplateView";
import EditTemplate from "./EditTemplate";
import AddQuestionToTemplate from "./AddQuestionToTemplate";
import DeleteTemplate from "./DeleteTemplate";
import QuestionTemplateView from "./QuestionTemplateView";
import EditQuestion from "./EditQuestion";
import DeleteQuestion from "./DeleteQuestion";
import CompanyView from "./CompanyView";
import EditCompany from "./EditCompany";
import DeleteCompany from "./DeleteCompany";

export default function AdminDashboard({ recaptchaRef }) {
  const [key, setKey] = useState("templates");
  const [templates, setTemplates] = useState(null);
  const [questionTemplates, setQuestionTamples] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleTabs = (k) => {
    setKey(k);

    if (k === "templates") {
      getTemplates();
    } else if (k === "question_templates") {
      getQuestionTemplates();
    } else if (k === "companies") {
      getCompanies();
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = (window, id) => {
    if (window === "create_question_template") {
      setShow(true);
      setModalData(
        <CreateQuestionTemplate
          recaptchaRef={recaptchaRef}
          getQuestionTemplates={getQuestionTemplates}
        />
      );
    } else if (window === "create_template") {
      setShow(true);
      setModalData(
        <CreateTemplate
          recaptchaRef={recaptchaRef}
          getTemplates={getTemplates}
        />
      );
    } else if (window === "view_template") {
      setShow(true);
      setModalData(<TemplateView template={id} />);
    } else if (window === "edit_template") {
      setShow(true);
      setModalData(
        <EditTemplate
          template={id}
          recaptchaRef={recaptchaRef}
          getTemplates={getTemplates}
        />
      );
    } else if (window === "add_question") {
      setShow(true);
      setModalData(
        <AddQuestionToTemplate template={id} getTemplates={getTemplates} />
      );
    } else if (window === "delete_template") {
      setShow(true);
      setModalData(
        <DeleteTemplate
          recaptchaRef={recaptchaRef}
          template={id}
          getTemplates={getTemplates}
        />
      );
    } else if (window === "view_question") {
      setShow(true);
      setModalData(<QuestionTemplateView question={id} />);
    } else if (window === "edit_question") {
      setShow(true);
      setModalData(
        <EditQuestion
          question={id}
          recaptchaRef={recaptchaRef}
          getQuestionTemplates={getQuestionTemplates}
        />
      );
    } else if (window === "delete_question") {
      setShow(true);
      setModalData(
        <DeleteQuestion
          recaptchaRef={recaptchaRef}
          question={id}
          getQuestionTemplates={getQuestionTemplates}
        />
      );
    } else if (window === "view_company") {
      setShow(true);
      setModalData(<CompanyView company={id} />);
    } else if (window === "edit_company") {
      setShow(true);
      setModalData(
        <EditCompany
          recaptchaRef={recaptchaRef}
          company={id}
          getCompanies={getCompanies}
        />
      );
    } else if (window === "delete_company") {
      setShow(true);
      setModalData(
        <DeleteCompany
          recaptchaRef={recaptchaRef}
          company={id}
          getCompanies={getCompanies}
        />
      );
    }
  };

  const getTemplates = useCallback(() => {
    setLoading(true);

    facade
      .getInterviewTemplates()
      .then((response) => {
        setTemplates(
          <>
            <Button
              className="mb-3"
              content="Opret Ny Samtale Skabelon"
              icon="tasks"
              labelPosition="left"
              onClick={() => {
                handleOpen("create_template");
              }}
            />
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Navn</th>
                  <th>Maximum Antal Ledere</th>
                  <th>Maximum Antal Medarbejdere</th>
                  <th>Antal Spørgsmål</th>
                  <th className="w-25">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {response.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td key="name">{data.name}</td>
                      <td key="amountOfManagers">
                        {data.amount_of_managers_allowed}
                      </td>
                      <td key="amountOfEmployees">
                        {data.amount_of_employees_allowed}
                      </td>
                      <td key="amountOfQuestions">{data.questions.length}</td>
                      <td key="actions" align="center">
                        <Icon
                          bordered
                          name="eye"
                          onClick={() => {
                            handleOpen("view_template", data.id);
                          }}
                        />
                        <Icon
                          bordered
                          name="edit"
                          onClick={() => {
                            handleOpen("edit_template", data.id);
                          }}
                        />
                        <Icon
                          bordered
                          name="add"
                          onClick={() => {
                            handleOpen("add_question", data.id);
                          }}
                        />
                        <Icon
                          bordered
                          name="remove"
                          onClick={() => {
                            handleOpen("delete_template", data.id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setTemplates(e.message);
          });

          return;
        }

        setTemplates("Der opstod en uventet fejl, prøv igen om lidt");
      })
      .then(() => {
        setLoading(false);
      });
  }, [setTemplates]);

  const getQuestionTemplates = () => {
    setLoading(true);

    facade
      .getQuestionTemplates()
      .then((response) => {
        setQuestionTamples(
          <>
            <Button
              className="mb-3"
              content="Opret Nyt Spørgsmål"
              icon="question"
              labelPosition="left"
              onClick={() => {
                handleOpen("create_question_template");
              }}
            />
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Navn</th>
                  <th>Spørgsmål</th>
                  <th className="w-25">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {response.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td key="name">{data.name}</td>
                      <td key="questin">{data.question}</td>
                      <td key="actions" align="center">
                        <Icon
                          bordered
                          name="eye"
                          onClick={() => {
                            handleOpen("view_question", data.id);
                          }}
                        />
                        <Icon
                          bordered
                          name="edit"
                          onClick={() => {
                            handleOpen("edit_question", data.id);
                          }}
                        />
                        <Icon
                          bordered
                          name="remove"
                          onClick={() => {
                            handleOpen("delete_question", data.id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setQuestionTamples(e.message);
          });

          return;
        }

        setQuestionTamples("Der opstod en uventet fejl, prøv igen om lidt");
      })
      .then(() => {
        setLoading(false);
      });
  };

  const getCompanies = () => {
    setLoading(true);

    facade
      .getAllCompanies()
      .then((response) => {
        setCompanies(
          <Table bordered striped hover>
            <thead>
              <tr>
                <th>Virksomhedsnavn</th>
                <th>CVR</th>
                <th>Status</th>
                <th className="w-25">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data) => {
                return (
                  <tr key={data.id}>
                    <td key="name">{data.name}</td>
                    <td key="CVR">{data.cvr}</td>
                    <td key="status"></td>
                    <td key="actions" align="center">
                      <Icon
                        bordered
                        name="eye"
                        onClick={() => {
                          handleOpen("view_company", data.id);
                        }}
                      />
                      <Icon
                        bordered
                        name="edit"
                        onClick={() => {
                          handleOpen("edit_company", data.id);
                        }}
                      />
                      <Icon
                        bordered
                        name="remove"
                        onClick={() => {
                          handleOpen("delete_company", data.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setCompanies(e.message);
          });

          return;
        }

        setCompanies("Der opstod en uventet fejl, prøv igen om lidt");
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTemplates();
  }, [getTemplates]);

  return (
    <>
      <Segment>
        <Tabs activeKey={key} onSelect={(k) => handleTabs(k)} className="mb-3">
          <Tab
            eventKey="templates"
            title="Samtale Skabeloner"
            onSelect={getTemplates}
          >
            <Segment>
              {loading ? (
                <>
                  <Loader active />
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </>
              ) : (
                <>{templates}</>
              )}
            </Segment>
          </Tab>
          <Tab
            eventKey="question_templates"
            title="Spørgsmåls Skabeloner"
            onSelect={getQuestionTemplates}
          >
            <Segment>
              {loading ? (
                <>
                  <Loader active />
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </>
              ) : (
                <>{questionTemplates}</>
              )}
            </Segment>
          </Tab>
          <Tab
            eventKey="companies"
            title="Virksomheder"
            onSelect={getCompanies}
          >
            <Segment>
              {loading ? (
                <>
                  <Loader active />
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </>
              ) : (
                <>{companies}</>
              )}
            </Segment>
          </Tab>
        </Tabs>
      </Segment>
      <Modal show={show} onHide={handleClose}>
        {modalData}
      </Modal>
    </>
  );
}
