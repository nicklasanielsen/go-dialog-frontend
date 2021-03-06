import { Tabs, Tab, Table, Modal } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { Loader, Segment, Image, Icon, Button } from "semantic-ui-react";
import facade from "../Facade";
import ProfileView from "./ProfileView";
import InviteUser from "./InviteUser";
import EditManager from "./EditManager";
import EditEmployee from "./EditEmployee";
import DeleteInterview from "./DeleteInterview";
import SendInterviewInvitation from "./SendInterviewInvitation";
import InterviewView from "./InterviewView";

export default function HRDashboard({ recaptchaRef }) {
  const [key, setKey] = useState("upcoming");
  const [upcoming, setUpcoming] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [managers, setManagers] = useState(null);
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
    } else if (k === "managers") {
      getManagers();
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
    } else if (window === "edit_manager") {
      setShow(true);
      setModalData(<EditManager user={user} recaptchaRef={recaptchaRef} />);
    } else if (window === "edit_employee") {
      setShow(true);
      setModalData(<EditEmployee user={user} recaptchaRef={recaptchaRef} />);
    } else if (window === "invite") {
      setShow(true);
      setModalData(<InviteUser recaptchaRef={recaptchaRef} />);
    } else if (window === "interview_send") {
      setShow(true);
      setModalData(
        <SendInterviewInvitation recaptchaRef={recaptchaRef} interview={user} />
      );
    } else if (window === "interview_eye") {
      setShow(true);
      setModalData(<InterviewView interview={user} />);
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
      .getHRUpcoming()
      .then((response) => {
        setUpcoming(
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Data</th>
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
                        return employee.person.fullname + ",";
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
        }

        setUpcoming("Der opstod en uventet fejl, pr??v igen om lidt");
      })
      .then(() => {
        setLoading(false);
      });
  }, [setLoading]);

  const getPrevious = () => {
    setLoading(true);

    facade
      .getHRPrevious()
      .then((response) => {
        setPrevious(
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Data</th>
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
                        return manager.person.fullname + ",";
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
        }

        setPrevious("Der opstod en uventet fejl, pr??v igen om lidt");
      })
      .then(() => {
        setLoading(false);
      });
  };

  const getManagers = () => {
    setLoading(true);

    facade
      .getManagersByCompany()
      .then((response) => {
        setManagers(
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Navn</th>
                <th className="w-25">Handling</th>
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
                        name="edit"
                        onClick={() => {
                          handleOpen(data.id, "edit_manager");
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
            setManagers(e.message);
            return;
          });

          setManagers("Der opstod en uventet fejl, pr??v igen om lidt");
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  const getEmployees = () => {
    setLoading(true);

    facade
      .getUsersByCompany()
      .then((response) => {
        setEmployees(
          <>
            <Button
              className="mb-3"
              content="Inviter Ny Bruger"
              icon="add user"
              labelPosition="left"
              onClick={() => {
                handleOpen(null, "invite");
              }}
            />
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
                      <td key="name">{data.person.fullname} </td>
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
                          name="edit"
                          onClick={() => {
                            handleOpen(data.id, "edit_employee");
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
            setEmployees(e.message);
            return;
          });

          setEmployees("Der opstod en uventet fejl, pr??v igen om lidt");
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
            eventKey="managers"
            title="Oversigt Over Ledere"
            onSelect={getManagers}
          >
            <Segment>
              {loading ? (
                <>
                  <Loader active />
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </>
              ) : (
                <>{managers}</>
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
