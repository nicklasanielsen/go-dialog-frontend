import { useState } from "react";
import {
  Grid,
  Segment,
  Header,
  Message,
  MessageHeader,
  GridRow,
} from "semantic-ui-react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Collapse,
} from "react-bootstrap";
import facade from "../Facade";
import logo from "../images/logo.png";

export default function Home({ recaptchaRef }) {
  const init = {
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    password: "",
    verifyPassword: "",
    termsAccepted: false,
  };
  const [credentials, setCredentials] = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(true);

  const performRegistration = (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (
      credentials.firstname === "" ||
      credentials.middlename === "" ||
      credentials.lastname === "" ||
      credentials.email === "" ||
      credentials.password === "" ||
      credentials.verifyPassword === "" ||
      credentials.termsAccepted === false
    ) {
      setError(
        "Alle felter skal udfyldes, og Vilkår og betingelser skal accepteres"
      );
      return;
    }

    if (credentials.password !== credentials.verifyPassword) {
      setError("Adgangskoderne er ikke ens");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .register(
          credentials.firstname,
          credentials.middlename,
          credentials.lastname,
          credentials.email,
          credentials.password,
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
    if (event.target.id !== "termsAccepted") {
      setCredentials({
        ...credentials,
        [event.target.id]: event.target.value,
      });
    } else {
      setCredentials({
        ...credentials,
        [event.target.id]: !credentials.termsAccepted,
      });
    }
  };

  return (
    <>
      <Grid centered columns={2} relaxed="very" stackable>
        <Grid.Column verticalAlign="middle">
          <Image alt="" src={logo} />
          <GridRow>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </GridRow>
        </Grid.Column>
        <Grid.Column>
          <Header as="h2" attached="top" inverted>
            Tilmeld dig og din virksomhed for at komme i gang!
          </Header>
          <Segment attached loading={loading}>
            <Container>
              <Collapse in={open}>
                <Form onChange={onChange}>
                  <Col>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>Fornavn(e)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Fornavn(e)"
                          minLength="2"
                          maxLength="64"
                          id="firstname"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>Mellemnavn(e)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Mellemnavn(e)"
                          minLength="2"
                          maxLength="64"
                          id="middlename"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>Efternavn(e)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Efternavn(e)"
                          minLength="2"
                          maxLength="64"
                          id="lastname"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
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
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>Adgangskode</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Adgangskode"
                          minLength="8"
                          maxLength="64"
                          id="password"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>Bekræft Adgangskode</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Bekræft Adgangskode"
                          minLength="2"
                          maxLength="64"
                          id="verifyPassword"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Jeg accepterer Vilkår og betingelser"
                          id="termsAccepted"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={performRegistration}
                      >
                        Register
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
