import { useCallback, useEffect, useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";
import facade from "../Facade";

export default function TemplateView({ template }) {
  const init = {
    name: <Spinner animation="border" />,
    amount_of_managers: <Spinner animation="border" />,
    amount_of_employees: <Spinner animation="border" />,
    questions: <Spinner animation="border" />,
  };
  const [templateDetails, setTemplateDetails] = useState(init);

  const getTemplateDetails = useCallback(() => {
    facade
      .getInterviewTemplateById(template)
      .then((response) => {
        setTemplateDetails({
          name: response.name,
          amount_of_managers: response.amount_of_managers_allowed,
          amount_of_employees: response.amount_of_employees_allowed,
          questions: (
            <Table borderless striped hover>
              <thead>
                <tr>
                  <th>Navn</th>
                  <th>Spørgsmål</th>
                </tr>
              </thead>
              <tbody>
                {response.questions.map((question) => {
                  return (
                    <tr>
                      <td>{question.name}</td>
                      <td>{question.question}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ),
        });
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setTemplateDetails({
              name: e.message,
              amount_of_managers: e.message,
              amount_of_employees: e.message,
              questions: e.message,
            });
          });

          return;
        }

        setTemplateDetails({
          name: "Der opstod en uventet fejl, prøv igen om lidt",
          amount_of_managers: "Der opstod en uventet fejl, prøv igen om lidt",
          amount_of_employees: "Der opstod en uventet fejl, prøv igen om lidt",
          questions: "Der opstod en uventet fejl, prøv igen om lidt",
        });
      });
  }, [setTemplateDetails]);

  useEffect(() => {
    getTemplateDetails();
  }, [getTemplateDetails]);

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Modal.Title>Samtale Skabelons Oplysninger</Modal.Title>
        <Table borderless striped hover>
          <tbody>
            <tr>
              <td>Navn:</td>
              <td>{templateDetails.name}</td>
            </tr>
            <tr>
              <td>Maximum Antal Ledere</td>
              <td>{templateDetails.amount_of_managers}</td>
            </tr>
            <tr>
              <td>Maximum Antal Medarbejdere</td>
              <td>{templateDetails.amount_of_employees}</td>
            </tr>
          </tbody>
        </Table>
        <Modal.Title>Spørgsmål</Modal.Title>
        {templateDetails.questions}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
