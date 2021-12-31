import { useCallback, useEffect, useState } from "react";
import {
  Collapse,
  Form,
  Modal,
  Table,
  Row,
  Button,
  Spinner,
} from "react-bootstrap";
import { Segment, Message, MessageHeader, Icon } from "semantic-ui-react";
import facade from "../Facade";

export default function EditTemplate({ template, getTemplates, recaptchaRef }) {
  const init = {
    name: "",
    amount_of_managers: "",
    amount_of_employees: "",
  };
  const [templateDetails, setTemplateDetails] = useState(init);
  const [questions, setQuestions] = useState(<Spinner animation="border" />);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const getQuestions = () => {
    facade.getInterviewTemplateById(template).then((response) => {
      setQuestions(
        <Table borderless striped hover>
          <thead>
            <tr>
              <td>Navn</td>
              <td>Spørgsmål</td>
              <td>Handling</td>
            </tr>
          </thead>
          <tbody>
            {response.questions.map((question) => {
              return (
                <tr key={question.id}>
                  <td key="name">{question.name}</td>
                  <td key="question">{question.question}</td>
                  <td key="action">
                    <Icon
                      name="remove"
                      onClick={() => {
                        removeQuestion(question.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    });
  };

  const removeQuestion = (question) => {
    facade.removeQuestionFromTemplate(template, question).then(() => {
      getQuestions();
      getTemplates();
    });
  };

  const getTemplateDetails = useCallback(() => {
    facade
      .getInterviewTemplateById(template)
      .then((response) => {
        setTemplateDetails({
          name: response.name,
          amount_of_managers: response.amount_of_managers_allowed,
          amount_of_employees: response.amount_of_employees_allowed,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setError(e.message);
          });

          return;
        }

        setError("Der opstod en uventet fejl, prøv igen om lidt");
      })
      .then(() => {
        getQuestions();
      });
  }, [setTemplateDetails]);

  useEffect(() => {
    getTemplateDetails();
  }, [getTemplateDetails]);

  const updateTemplate = (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .updateTemplate(
          template,
          templateDetails.name,
          templateDetails.amount_of_managers,
          templateDetails.amount_of_employees
        )
        .then((response) => {
          setMessage(response.message);
          setOpen(false);
          getTemplates();
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => {
              setError(e.message);
            });

            return;
          }

          setError("Der opstod en uventet fejl, prøv igen om lidt");
        })
        .then(() => {
          recaptchaRef.current.reset();
        })
        .then(() => {
          setLoading(false);
        });
    });
  };

  const onChange = (event) => {
    setTemplateDetails({
      ...templateDetails,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Segment loading={loading}>
          <Collapse in={open}>
            <Form onChange={onChange}>
              <Modal.Title>Samtale Skabelons Oplysninger</Modal.Title>
              <Table borderless striped hover>
                <tbody>
                  <tr>
                    <td>Navn</td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Navn"
                          value={templateDetails.name}
                          id="name"
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>Maximum Antal Ledere</td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Maximum Antal Ledere"
                          value={templateDetails.amount_of_managers}
                          id="amount_of_managers"
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>Maximum Antal Medarbejdere</td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Maximum Antal Medarbejdere"
                          value={templateDetails.amount_of_employees}
                          id="amount_of_employees"
                        />
                      </Form.Group>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Modal.Title>Spørgsmål</Modal.Title>
              {questions}
              <Row className="mb-3 mt-3">
                <Button variant="primary" onClick={updateTemplate}>
                  Opdater Samtale Skabelon
                </Button>
              </Row>
            </Form>
          </Collapse>
          {error && (
            <Row className="mb-3 mt-3">
              <Message negative>
                <MessageHeader>Hovsa..</MessageHeader>
                {error}
              </Message>
            </Row>
          )}
          {message && (
            <Row className="mt-3 mb-3">
              <Message positive>
                <MessageHeader>Sådan!</MessageHeader>
                {message}
              </Message>
            </Row>
          )}
        </Segment>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
