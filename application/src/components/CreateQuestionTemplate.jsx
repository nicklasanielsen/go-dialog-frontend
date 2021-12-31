import { useState } from "react";
import { Button, Collapse, Container, Form, Modal, Row } from "react-bootstrap";
import { Segment, Message, MessageHeader } from "semantic-ui-react";
import facade from "../Facade";

export default function CreateQuestionTemplate({
  recaptchaRef,
  getQuestionTemplates,
}) {
  const init = { name: "", question: "" };
  const [details, setDetails] = useState(init);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const create = (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (details.name === "" || details.question === "") {
      setError("Alle felter skal udfyldes");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .createQuestionTemplate(details.name, details.question, recaptcha)
        .then((response) => {
          setOpen(false);
          setMessage(response.message);
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
        .then(() => setLoading(false));
    });
  };

  const onChange = (event) => {
    setDetails({
      ...details,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Opret Nyt Spørgsmål</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Segment loading={loading}>
          <Container>
            <Collapse in={open}>
              <Form onChange={onChange}>
                <Form.Group>
                  <Form.Label>Navn</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Navn"
                    minLength="2"
                    maxLength="64"
                    id="name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Spørgsmål</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Spørgsmål"
                    minLength="2"
                    maxLength="320"
                    id="question"
                  />
                </Form.Group>
                <Row className="mt-3 mb-3">
                  <Button variant="primary" type="submit" onClick={create}>
                    Opret Spørgsmål
                  </Button>
                </Row>
              </Form>
            </Collapse>
            {error && (
              <Row className="mt-3 mb-3">
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
          </Container>
        </Segment>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
