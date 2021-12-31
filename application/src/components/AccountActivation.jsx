import { useParams } from "react-router-dom";
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
import logo from "../images/logo.png";
import facade from "../Facade";

export default function AccountActivation({ recaptchaRef }) {
  let { userID, activationCode } = useParams();
  const init = { cvr: "", name: "" };
  const [details, setDetails] = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState(null);

  const performRegistration = (event) => {
    event.preventDefault();
    setError(null);

    if (details.cvr === "" || details.name === "") {
      setError("Både virksomhedsnavn og CVR nummer skal oplyses");
      return;
    }

    if (details.cvr.length !== 8) {
      setError("CVR nummeret skal have en længde af 8 cifre");
      return;
    }

    const digits_only = (string) =>
      [...string].every((c) => "0123456789".includes(c));
    if (!digits_only(details.cvr)) {
      setError("CVR nummeret skal kun bestå af tal");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .accountAndCompanyActivation(
          userID,
          activationCode,
          details.cvr,
          details.name,
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
    setDetails({
      ...details,
      [event.target.id]: event.target.value,
    });
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
            Virksomhedsoplysninger
          </Header>
          <Segment attached loading={loading}>
            <Container>
              <Collapse in={open}>
                <Form onChange={onChange}>
                  <Col>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>Virksomhedsnavn</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Virksomhedsnavn"
                          id="name"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Form.Group>
                        <Form.Label>CVR</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="CVR"
                          minLength="8"
                          maxLength="8"
                          id="cvr"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={performRegistration}
                      >
                        Register Virksomhed
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
