import { Button, Collapse, Container, Form, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { Message, MessageHeader, Segment } from "semantic-ui-react";
import { useCallback } from "react";
import { useEffect } from "react";
import facade from "../Facade";

export default function CreateInterview({ recaptchaRef, user }) {
  const init = { template: "", date: "", time: "" };
  const [details, setDetails] = useState(init);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const getOptions = useCallback(() => {
    facade
      .getInterviewTemplates()
      .then((response) => {
        setOptions(
          response.map((data) => {
            return (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            );
          })
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setError(e.message);
          });

          return;
        }

        setError("Kunne ikke indlæse samtale skabelonerne, prøv igen senere");
      });
  }, [setOptions]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  const create = (event) => {
    event.preventDefault();

    setError(null);
    setMessage(null);

    if (details.template === "" || details.date === "" || details.time === "") {
      setError("Alle felter skal udfyldes");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .createInterview(
          user,
          details.template,
          details.date,
          details.time,
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

          setError("Der opstod en uventet fejl, prøv igen senere");
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
      <Modal.Header>
        <Modal.Title>Opret Samtale</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Segment loading={loading}>
          <Container>
            <Collapse in={open}>
              <Form onChange={onChange}>
                <Modal.Title>Samtale Skabelon</Modal.Title>
                <Form.Group>
                  <Form.Control
                    as="select"
                    disabled={options === null}
                    id="template"
                  >
                    <option disabled selected>
                      Vælg Samtale Skabelon
                    </option>
                    {options}
                  </Form.Control>
                </Form.Group>
                <Modal.Title>Samtalen Afholdes</Modal.Title>
                <Form.Group>
                  <Form.Control type="date" id="date" />
                </Form.Group>
                <Form.Group className="mt-3 mb-3">
                  <Form.Control type="time" id="time" />
                </Form.Group>
                <Row className="mt-3 mb-3">
                  <Button variant="primary" type="submit" onClick={create}>
                    Opret Samtale
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
