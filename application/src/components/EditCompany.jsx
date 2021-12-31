import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Collapse, Form, Modal, Table, Row, Button } from "react-bootstrap";
import { Segment, Message, MessageHeader } from "semantic-ui-react";
import facade from "../Facade";

export default function EditCompany({ company, recaptchaRef, getCompanies }) {
  const init = { name: "", cvr: "" };
  const [companyDetails, setCompanyDetails] = useState(init);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const getCompanyDetails = useCallback(() => {
    facade
      .getCompanyById(company)
      .then((response) => {
        setCompanyDetails({ name: response.name, cvr: response.cvr });
        setLoading(false);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setError(e.message);
          });

          return;
        }

        setError(
          "Der opstod en uventet fejl under indlæsningen af oplysningerne, prøv igen senere"
        );
      });
  }, [setCompanyDetails, setLoading]);

  useEffect(() => {
    getCompanyDetails();
  }, [getCompanyDetails]);

  const updateCompany = (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (companyDetails.name === "" || companyDetails.cvr === "") {
      setError("Alle felter skal udfyldes");
      return;
    }

    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .updateCompany(
          company,
          companyDetails.name,
          companyDetails.cvr,
          recaptcha
        )
        .then((response) => {
          setMessage(response.message);
          setOpen(false);
          getCompanies();
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
    setCompanyDetails({
      ...companyDetails,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Segment loading={loading}>
          <Collapse in={open}>
            <Form onChange={onChange}>
              <Table borderless striped hover>
                <tbody>
                  <tr>
                    <td>Navn</td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Navn"
                        value={companyDetails.name}
                        id="name"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>CVR</td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="CVR"
                        minLength="8"
                        maxLength="8"
                        value={companyDetails.cvr}
                        id="cvr"
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Row className="mb-3 mt-3">
                <Button variant="primary" onClick={updateCompany}>
                  Opdater Virksomhedsoplysningerne
                </Button>
              </Row>
            </Form>
          </Collapse>
          {error && (
            <Row className="mb-3 mt-3">
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
        </Segment>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
