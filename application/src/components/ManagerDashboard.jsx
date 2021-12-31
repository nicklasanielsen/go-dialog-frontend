import { Tabs, Tab, Table, Modal } from "react-bootstrap";
import { Segment, Loader, Image, Icon } from "semantic-ui-react";
import { useState, useCallback, useEffect } from "react";
import facade from "../Facade";
import ProfileView from "./ProfileView";
import CreateInterview from "./CreateInterview";
import DeleteInterview from "./DeleteInterview";
import SendInterviewInvitation from "./SendInterviewInvitation";
import InterviewView from "./InterviewView";
import AnswerInterview from "./AnswerInterview";

export default function ManagerDashboard({ recaptchaRef }) {
  const [key, setKey] = useState("upcoming");
  const [upcoming, setUpcoming] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleTabs = (k) => {
    setKey(k);

    if (k === "upcoming") {
      getUpcoming();
    } else if (k === "previous") {
      getPrevious();
    } else if (k === "employees") {
      getEmployees();
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = (user, window) => {
    if (window === "eye") {
      setShow(true);
      setModalData(<ProfileView user={user} />);
    } else if (window === "talk") {
      setShow(true);
      setModalData(<CreateInterview recaptchaRef={recaptchaRef} user={user} />);
    } else if (window === "interview_send") {
      setShow(true);
      setModalData(
        <SendInterviewInvitation recaptchaRef={recaptchaRef} interview={user} />
      );
    } else if (window === "interview_eye") {
      setShow(true);
      setModalData(<InterviewView interview={user} />);
    } else if (window === "interview_edit") {
      setShow(true);
      setModalData(
        <AnswerInterview interview={user} recaptchaRef={recaptchaRef} />
      );
    } else if (window === "interview_delete") {
      setShow(true);
      setModalData(
        <DeleteInterview
          interview={user}
          recaptchaRef={recaptchaRef}
          getUpcoming={getUpcoming}
          getPrevious={getPrevious}
        />
      );
    }
  };

  const getUpcoming = useCallback(() => {
    setLoading(true);

    facade
      .getManagerUpcoming()
      .then((response) => {
        setUpcoming(
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dato</th>
                <th>Type</th>
                <th>Ledere</th>
                <th>Medarbejdere</th>
                <th className="w-25">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data) => {
                return (
                  <tr key={data.id}>
                    <td key="held">{data.held}</td>
                    <td key="template">{data.interview_template.name}</td>
                    <td key="managers">
                      {data.managers.map((manager) => {
                        return manager.person.fullname + ", ";
                      })}
                    </td>
                    <td key="employees">
                      {data.employees.map((employee) => {
                        return employee.person.fullname + ", ";
                      })}
                    </td>
                    <td key="actions" align="center">
                      <Icon
                        bordered
                        name="send"
                        onClick={() => {
                          handleOpen(data.id, "interview_send");
                        }}
                      />
                      <Icon
                        bordered
                        name="eye"
                        onClick={() => {
                          handleOpen(data.id, "interview_eye");
                        }}
                      />
                      <Icon
                        bordered
                        name="edit"
                        onClick={() => {
                          handleOpen(data.id, "interview_edit");
                        }}
                      />
                      <Icon
                        bordered
                        name="delete"
                        onClick={() => {
                          handleOpen(data.id, "interview_delete");
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
            setUpcoming(e.message);
            return;
          });

          setUpcoming("Der opstod en uventet fejl, prøv igen om lidt");
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, [setLoading]);

  const getPrevious = () => {
    setLoading(true);

    facade
      .getManagerPrevious()
      .then((response) => {
        setPrevious(
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dato</th>
                <th>Type</th>
                <th>Ledere</th>
                <th>Medarbejdere</th>
                <th className="w-25">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data) => {
                return (
                  <tr key={data.id}>
                    <td key="held">{data.held}</td>
                    <td key="type">{data.interview_template.name}</td>
                    <td key="managers">
                      {data.managers.map((manager) => {
                        return manager.person.fullname + ", ";
                      })}
                    </td>
                    <td key="employees">
                      {data.employees.map((employee) => {
                        return employee.person.fullname + ", ";
                      })}
                    </td>
                    <td key="actions" align="center">
                      <Icon
                        bordered
                        name="send"
                        onClick={() => {
                          handleOpen(data.id, "interview_send");
                        }}
                      />
                      <Icon
                        bordered
                        name="eye"
                        onClick={() => {
                          handleOpen(data.id, "interview_eye");
                        }}
                      />
                      <Icon
                        bordered
                        name="edit"
                        onClick={() => {
                          handleOpen(data.id, "interview_edit");
                        }}
                      />
                      <Icon
                        bordered
                        name="delete"
                        onClick={() => {
                          handleOpen(data.id, "interview_delete");
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
            setPrevious(e.message);
            return;
          });

          setPrevious("Der opstod en uventet fejl, prøv igen om lidt");
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  const getEmployees = () => {
    setLoading(true);

    facade
      .getEmployeesByManager()
      .then((response) => {
        setEmployees(
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Navn</th>
                <th className="w-25">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data) => {
                return (
                  <tr key={data.id}>
                    <td key="name">{data.person.fullname}</td>
                    <td key="actions" align="center">
                      <Icon
                        bordered
                        name="eye"
                        onClick={() => {
                          handleOpen(data.id, "eye");
                        }}
                      />
                      <Icon
                        bordered
                        name="talk"
                        onClick={() => {
                          handleOpen(data.id, "talk");
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
            setEmployees(e.message);
            return;
          });

          setEmployees("Der opstod en uventet fejl, prøv igen om list");
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUpcoming();
  }, [getUpcoming]);

  return (
    <>
      <Segment>
        <Tabs activeKey={key} onSelect={(k) => handleTabs(k)} className="mb-3">
          <Tab
            eventKey="upcoming"
            title="Kommende Samtaler"
            onSelect={getUpcoming}
          >
            <Segment>
              {loading ? (
                <>
                  <Loader active />
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </>
              ) : (
                <>{upcoming}</>
              )}
            </Segment>
          </Tab>
          <Tab
            eventKey="previous"
            title="Tidligere Samtaler"
            onSelect={getPrevious}
          >
            <Segment>
              {loading ? (
                <>
                  <Loader active />
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </>
              ) : (
                <>{previous}</>
              )}
            </Segment>
          </Tab>
          <Tab
            eventKey="employees"
            title="Oversigt Over Medarbejdere"
            onSelect={getEmployees}
          >
            <Segment>
              {loading ? (
                <>
                  <Loader active />
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </>
              ) : (
                <>{employees}</>
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
