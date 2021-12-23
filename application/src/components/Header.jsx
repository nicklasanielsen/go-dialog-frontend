import {
  Container,
  Navbar,
  Nav,
  Image,
  NavItem,
  Modal,
  Button,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import facade from "../Facade";
import { useState } from "react";
import { Message, MessageHeader, Segment } from "semantic-ui-react";

export default function Header({
  isLoggedIn,
  setLoggedIn,
  isManager,
  isHR,
  isAdmin,
  recaptchaRef,
}) {
  const [show, setShow] = useState(false);
  const init = { email: "", password: "" };
  const [credentials, setCredentials] = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const performLogout = () => {
    setLoggedIn(false);
    facade.logout();
  };

  const performLogin = (event) => {
    event.preventDefault();
    setError(null);

    if (credentials.email === "" || credentials.password === "") {
      setError("Alle felter skal udfyldes");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .login(credentials.email, credentials.password, recaptcha)
        .then((response) => {
          /** LOGIN */
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
    setCredentials({
      ...credentials,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Navbar
        className="color-nav"
        sticky="top"
        collapseOnSelect
        expand="lg"
        variant="light"
      >
        <Container>
          <Navbar.Brand>
            <Image alt="" src={logo} height={75} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {isLoggedIn ? (
                <>
                  <NavItem eventkey={1} href="/dashboard">
                    <Nav.Link as={Link} to="/dashboard">
                      Dashboard
                    </Nav.Link>
                  </NavItem>
                  {isAdmin ? (
                    <>
                      <NavItem eventkey={1} href="/dashboard/admin">
                        <Nav.Link as={Link} to="/dashboard/admin">
                          Admin Dashboard
                        </Nav.Link>
                      </NavItem>
                    </>
                  ) : (
                    <></>
                  )}
                  {isHR ? (
                    <>
                      <NavItem eventkey={1} href="/dashboard/hr">
                        <Nav.Link as={Link} to="/dashboard/hr">
                          HR Dashboard
                        </Nav.Link>
                      </NavItem>
                    </>
                  ) : (
                    <></>
                  )}
                  {isManager ? (
                    <>
                      <NavItem eventkey={1} href="/dashboard/manager">
                        <Nav.Link as={Link} to="/dashboard/manager">
                          Manager Dashboard
                        </Nav.Link>
                      </NavItem>
                    </>
                  ) : (
                    <></>
                  )}
                  <NavItem eventkey={1} href="#" onClick={performLogout}>
                    <Nav.Link>Log Ud</Nav.Link>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem eventkey={1} href="#" onClick={handleShow}>
                    <Nav.Link>Log Ind</Nav.Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Log Ind</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Segment loading={loading}>
            <Container>
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
                <Row className="mt-3 mb-3">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={performLogin}
                  >
                    Log Ind
                  </Button>
                </Row>
              </Form>
              {error && (
                <Row className="mt-3 mb-3">
                  <Message negative>
                    <MessageHeader>Hovsa..</MessageHeader>
                    {error}
                  </Message>
                </Row>
              )}
            </Container>
          </Segment>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
