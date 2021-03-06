import { Tab, Table, Tabs, Modal } from "react-bootstrap";
import { Loader, Segment, Image, Icon } from "semantic-ui-react";
import { useState, useEffect, useCallback } from "react";
import facade from "../Facade";
import InterviewView from "./InterviewView";
import AnswerInterview from "./AnswerInterview";

export default function Dashboard({ recaptchaRef }) {
  const [key, setKey] = useState("upcoming");
  const [upcoming, setUpcoming] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleTabs = (k) => {
    setKey(k);

    if (k === "upcoming") {
      getUpcoming();
    } else if (k === "previous") {
      getPrevious();
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = (id, window) => {
    if (window === "eye") {
      setShow(true);
      setModalData(<InterviewView interview={id} />);
    } else if (window === "edit") {
      setShow(true);
      setModalData(
        <AnswerInterview interview={id} recaptchaRef={recaptchaRef} />
      );
    }
  };

  const getUpcoming = useCallback(() => {
    setLoading(true);

    facade
      .getUpcoming()
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
                        name="eye"
                        onClick={() => {
                          handleOpen(data.id, "eye");
                        }}
                      />
                      <Icon
                        bordered
                        name="edit"
                        onClick={() => {
                          handleOpen(data.id, "edit");
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

          setUpcoming("Der opstod en uventet fejl, pr??v igen om lidt");
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, [setLoading]);

  const getPrevious = () => {
    setLoading(true);

    facade
      .getPrevious()
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
                        name="eye"
                        onClick={() => {
                          handleOpen(data.id, "eye");
                        }}
                      />
                      <Icon
                        bordered
                        name="edit"
                        onClick={() => {
                          handleOpen(data.id, "edit");
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

          setPrevious("Der opstod en uventet fejl, pr??v igen om lidt");
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
        </Tabs>
      </Segment>
      <Modal show={show} onHide={handleClose}>
        {modalData}
      </Modal>
    </>
  );
}
