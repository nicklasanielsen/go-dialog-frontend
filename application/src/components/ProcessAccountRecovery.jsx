import { useState } from "react";
import { Col, Container, Form, Row, Button, Collapse } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  Grid,
  Segment,
  Header,
  Message,
  MessageHeader,
} from "semantic-ui-react";
import facade from "../Facade";

export default function ProcessAccountRecovery({ recaptchaRef }) {
  let { userID, recoveryCode } = useParams();
  const init = { password: "", verifyPassword: "" };
  const [passwords, setPasswords] = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(true);

  const recoverAccount = (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (passwords.password === "" || passwords.verifyPassword === "") {
      setError("Begge felter skal udfyldes");
      return;
    }

    if (passwords.password !== passwords.verifyPassword) {
      setError("Adgangskoderne er ikke ens");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .processAccountRecovery(
          userID,
          recoveryCode,
          passwords.password,
          recaptcha
        )
        .then((response) => {
          setMessage(response.message);
          setOpen(false);
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
    setPasswords({ ...passwords, [event.target.id]: event.target.value });
  };

  return (
    <>
      <Grid centered relaxed="very" stackable>
        <Grid.Column verticalAlign="middle" width={10}>
          <Header as="h2" attached="top" inverted>
            Nulstilling af Adgangskode
          </Header>
          <Segment attached loading={loading}>
            <Container>
              <Collapse in={open}>
                <Form onChange={onChange}>
                  <Col>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>Ny Adgangskode</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Ny Adgangskode"
                          minLength="8"
                          maxLength="64"
                          id="password"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>Bekræft Ny Adgangskode</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Bekræft Ny Adgangskode"
                          minLength="8"
                          maxLength="64"
                          id="verifyPassword"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={recoverAccount}
                      >
                        Nulstil adgangskode
                      </Button>
                    </Row>
                  </Col>
                </Form>
              </Collapse>
              <Row className="mt-3 mb-3">
                {error && (
                  <Message negative>
                    <MessageHeader>Hovsa..</MessageHeader>
                    {error}
                  </Message>
                )}
              </Row>
              <Row className="mt-3 mb-3">
                {message && (
                  <Message positive>
                    <MessageHeader>Sådan!</MessageHeader>
                    {message}
                  </Message>
                )}
              </Row>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
}
