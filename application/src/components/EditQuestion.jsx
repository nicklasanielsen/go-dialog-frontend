import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Form, Table, Row, Button, Collapse } from "react-bootstrap";
import { Message, MessageHeader, Segment } from "semantic-ui-react";
import facade from "../Facade";

export default function EditQuestion({
  question,
  recaptchaRef,
  getQuestionTemplates,
}) {
  const init = {
    name: "",
    question: "",
  };
  const [questionDetails, setQuestilDetails] = useState(init);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);

  const getQuestionDetails = useCallback(() => {
    facade
      .getQuestionTemplateById(question)
      .then((response) => {
        setQuestilDetails({ name: response.name, question: response.question });
        setLoading(false);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setError(e.message);
          });

          return;
        }

        setError(
          "Der opstod en uventet fejl under indlæsningen af oplysningerne, prøv igen om lidt"
        );
      });
  }, [setQuestilDetails, setLoading]);

  useEffect(() => {
    getQuestionDetails();
  }, [getQuestionDetails]);

  const updateQuestion = (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (questionDetails.name === "" || questionDetails.question === "") {
      setError("Alle felter skal udfyldes");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .updateQuestion(
          question,
          questionDetails.name,
          questionDetails.question,
          recaptcha
        )
        .then((response) => {
          setMessage(response.message);
          setOpen(false);
          getQuestionTemplates();
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
    setQuestilDetails({
      ...questionDetails,
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
              <Table borderless striped hover>
                <tbody>
                  <tr>
                    <td>Navn</td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Navn"
                        value={questionDetails.name}
                        id="name"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Spørgsmål</td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Spørgsmål"
                        value={questionDetails.question}
                        id="question"
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Row className="mb-3 mr-3">
                <Button variant="primary" onClick={updateQuestion}>
                  Opdater Spørgsmål
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
