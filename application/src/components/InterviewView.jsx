import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Modal, Table, Spinner } from "react-bootstrap";
import facade from "../Facade";

export default function InterviewView({ interview }) {
  const init = {
    type: <Spinner animation="border" />,
    held: <Spinner animation="border" />,
    managers: <Spinner animation="border" />,
    employees: <Spinner animation="border" />,
    questions: <Spinner animation="border" />,
    summary: <Spinner animation="border" />,
  };
  const [interviewData, setInterviewData] = useState(init);

  const getInterviewData = useCallback(() => {
    facade
      .getInterviewById(interview)
      .then((response) => {
        setInterviewData({
          type: response.interview_template.name,
          held: response.held,
          managers: response.managers.map((manager) => {
            return (
              <tr key={manager.id}>
                <td key="name">{manager.person.fullname}</td>
              </tr>
            );
          }),
          employees: response.employees.map((employee) => {
            return (
              <tr key={employee.id}>
                <td key="name">{employee.person.fullname}</td>
              </tr>
            );
          }),
          questions: response.questions.map((question) => {
            return (
              <Table borderless striped hover key={question.id}>
                <thead key={question.id + "_head"}>
                  <tr key="head_row">
                    <th key="question">{question.question}</th>
                  </tr>
                </thead>
                <tbody key={question.id + "_body"}>
                  {question.answers.map((answer) => {
                    return (
                      <tr key={answer.id}>
                        <td key="name">{answer.user_fullname}</td>
                        <td key="answer">{answer.answer}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            );
          }),
          summary: response.summary,
        });
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setInterviewData({
              type: e.message,
              held: e.message,
              managers: e.message,
              employees: e.message,
              questions: e.message,
              summary: e.message,
            });
          });

          return;
        }

        setInterviewData({
          type: "Der opstod en uventet fejl, prøv igen om lidt",
          held: "Der opstod en uventet fejl, prøv igen om lidt",
          managers: "Der opstod en uventet fejl, prøv igen om lidt",
          employees: "Der opstod en uventet fejl, prøv igen om lidt",
          questions: "Der opstod en uventet fejl, prøv igen om lidt",
          summary: "Der opstod en uventet fejl, prøv igen om lidt",
        });
      });
  }, [interview]);

  useEffect(() => {
    getInterviewData();
  }, [getInterviewData]);

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Modal.Title>Samtale Oplysninger</Modal.Title>
        <Table borderless striped hover>
          <tbody>
            <tr>
              <td>Type</td>
              <td>{interviewData.type}</td>
            </tr>
            <tr>
              <td>Dato</td>
              <td>{interviewData.held}</td>
            </tr>
          </tbody>
        </Table>
        <Modal.Title>Ledere</Modal.Title>
        <Table borderless striped hover>
          <tbody>{interviewData.managers}</tbody>
        </Table>
        <Modal.Title>Medarbejdere</Modal.Title>
        <Table borderless striped hover>
          <tbody>{interviewData.employees}</tbody>
        </Table>
        <Modal.Title>Spørgsmål & Svar</Modal.Title>
        {interviewData.questions}
        <Modal.Title>Opsumering</Modal.Title>
        {interviewData.summary}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
