import { useEffect } from "react";
import { useCallback, useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import facade from "../Facade";

export default function AddQuestionToTemplate({ template, getTemplates }) {
  const currentQuestions = [];
  const [questions, setQuestions] = useState(<Spinner animation="border" />);

  const addQuestion = (question) => {
    facade.addQuestionToTemplate(template, question).then(() => {
      currentQuestions.push(question);
      getQuestionTemplates();
      getTemplates();
    });
  };

  const getQuestionTemplates = () => {
    facade.getQuestionTemplates().then((response) => {
      setQuestions(
        <Table borderless striped hover>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Spørgsmål</th>
              <th>Handling</th>
            </tr>
          </thead>
          <tbody>
            {response.map((question) => {
              if (currentQuestions.includes(question.id)) {
                return;
              }

              return (
                <tr key={question.id}>
                  <td key="name">{question.name}</td>
                  <td key="question">{question.question}</td>
                  <td key="action" align="center">
                    <Icon
                      name="add"
                      onClick={() => {
                        addQuestion(question.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    });
  };

  const getCurrentQuestions = useCallback(() => {
    facade
      .getInterviewTemplateById(template)
      .then((response) => {
        response.questions.map((question) => {
          currentQuestions.push(question.id);
        });
      })
      .then(() => {
        getQuestionTemplates();
      });
  }, []);

  useEffect(() => {
    getCurrentQuestions();
  }, [getCurrentQuestions]);

  return (
    <>
      <Modal.Header>
        <Modal.Title>Tilføj Spørgsmål Til Samtale Skabelon</Modal.Title>
      </Modal.Header>
      <Modal.Body>{questions}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
