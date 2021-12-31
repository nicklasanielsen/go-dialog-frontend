import {
  Container,
  Navbar,
  Nav,
  Image,
  NavItem,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import facade from "../Facade";
import { useState } from "react";
import { Message, MessageHeader, Segment } from "semantic-ui-react";
import Login from "./Login";
import AccountRecovery from "./AccountRecovery";

export default function Header({
  isLoggedIn,
  setLoggedIn,
  isManager,
  isHR,
  isAdmin,
  recaptchaRef,
}) {
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentWindow, setCurrentWindow] = useState("LOGIN");

  const changeWindow = () => {
    setError(null);
    setMessage(null);

    if (currentWindow === "LOGIN") {
      setCurrentWindow("FORGOT_PASSWORD");
    } else {
      setCurrentWindow("LOGIN");
    }
  };

  const handleClose = () => {
    setShow(false);
    setError(null);
    setMessage(null);
    setCurrentWindow("LOGIN");
  };
  const handleShow = () => setShow(true);

  const performLogout = () => {
    setLoggedIn(false);
    facade.logout();
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
          <Modal.Title>
            {currentWindow === "LOGIN" ? (
              <>Log Ind</>
            ) : (
              <>Nulstil Adgangskode</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Segment loading={loading}>
            <Container>
              {currentWindow === "LOGIN" ? (
                <Login
                  recaptchaRef={recaptchaRef}
                  setError={setError}
                  setLoading={setLoading}
                  setLoggedIn={setLoggedIn}
                  setShow={setShow}
                />
              ) : (
                <AccountRecovery
                  recaptchaRef={recaptchaRef}
                  setError={setError}
                  setMessage={setMessage}
                  setLoading={setLoading}
                />
              )}
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
        <Modal.Footer>
          {currentWindow === "LOGIN" ? (
            <button
              type="button"
              className="link-button"
              onClick={changeWindow}
            >
              Glemt Adgangskode?
            </button>
          ) : (
            <button
              type="button"
              className="link-button"
              onClick={changeWindow}
            >
              Har du allerede en konto?
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
