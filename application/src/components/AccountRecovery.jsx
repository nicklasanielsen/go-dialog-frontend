import { useState } from "react";
import { Form, Row, Button, Collapse } from "react-bootstrap";
import facade from "../Facade";

export default function AccountRecovery({
  recaptchaRef,
  setError,
  setLoading,
  setMessage,
}) {
  const init = { email: "" };
  const [details, setDetails] = useState(init);
  const [open, setOpen] = useState(true);

  const requestAccountRecovery = (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (details.email === "") {
      setError("Angiv E-mail");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .requestAccountRecovery(details.email, recaptcha)
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
    setDetails({ ...details, [event.target.id]: event.target.value });
  };

  return (
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
          <Button
            variant="primary"
            type="submit"
            onClick={requestAccountRecovery}
          >
            Nulstil adgangskode
          </Button>
        </Row>
      </Form>
    </Collapse>
  );
}
