import { useState } from "react";
import { Button, Container, Form, Modal, Row, Collapse } from "react-bootstrap";
import { Message, MessageHeader, Segment } from "semantic-ui-react";
import facade from "../Facade";

export default function InviteUser({ recaptchaRef }) {
  const init = { email: "" };
  const [details, setDetails] = useState(init);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);

  const sendInvite = (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (details.email === "") {
      setError("E-mail skal udfyldes");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .invite(details.email, recaptcha)
        .then((response) => {
          setOpen(false);
          setMessage(response.message);
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
    setDetails({
      ...details,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Modal.Header>Inviter Ny Bruger</Modal.Header>
      <Modal.Body>
        <Segment loading={loading}>
          <Container>
            <Collapse in={open}>
              <Form onChange={onChange}>
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    minLength="6"
                    maxLength="320"
                    id="email"
                  />
                </Form.Group>
                <Row className="mt-3 mb-3">
                  <Button variant="primary" type="submit" onClick={sendInvite}>
                    Send Invitation
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
