import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";
import facade from "../Facade";

export default function QuestionTemplateView({ question }) {
  const init = {
    name: <Spinner animation="border" />,
    question: <Spinner animation="border" />,
  };
  const [questionDetails, setQuestionDetails] = useState(init);

  const getQuestionDetails = useCallback(() => {
    facade
      .getQuestionTemplateById(question)
      .then((response) => {
        setQuestionDetails({
          name: response.name,
          question: response.question,
        });
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setQuestionDetails({ name: e.message, question: e.message });
          });

          return;
        }

        setQuestionDetails({
          name: "Kunne ikke indlæses",
          question: "Kunne ikke indlæses",
        });
      });
  }, [setQuestionDetails]);

  useEffect(() => {
    getQuestionDetails();
  }, [getQuestionDetails]);

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Modal.Title>Spørgsmåls Oplysninger</Modal.Title>
        <Table borderless hover>
          <tbody>
            <tr>
              <td>Navn</td>
              <td>{questionDetails.name}</td>
            </tr>
            <tr>
              <td>Spørgsmål</td>
              <td>{questionDetails.question}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
