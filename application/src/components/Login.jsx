import { Button, Form, Row } from "react-bootstrap";
import { useState } from "react";
import facade from "../Facade";

export default function Login({ recaptchaRef, setError, setLoading }) {
  const init = { email: "", password: "" };
  const [credentials, setCredentials] = useState(init);

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
        .then(() => {
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
        <Button variant="primary" type="submit" onClick={performLogin}>
          Log Ind
        </Button>
      </Row>
    </Form>
  );
}
