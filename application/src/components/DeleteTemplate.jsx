import { useState } from "react";
import { Button, Collapse, Container, Modal, Row } from "react-bootstrap";
import { Segment, Message, MessageHeader } from "semantic-ui-react";
import facade from "../Facade";

export default function DeleteTemplate({
  recaptchaRef,
  template,
  getTemplates,
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const deleteTemplate = () => {
    setError(null);
    setMessage(null);
    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .deleteInterviewTemplate(template, recaptcha)
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

  return (
    <>
      <Modal.Header>
        <Modal.Title>Slet Samtale Skabelon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Segment loading={loading}>
          <Container>
            <Collapse in={open}>
              <Button variant="danger" onClick={deleteTemplate}>
                Slet Samtale Skabelon
              </Button>
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
