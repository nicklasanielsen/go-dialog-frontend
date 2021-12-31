import { useEffect } from "react";
import { useCallback, useState } from "react";
import { Button, Collapse, Container, Form, Modal, Row } from "react-bootstrap";
import { Segment, Message, MessageHeader } from "semantic-ui-react";
import facade from "../Facade";

export default function AnswerInterview({ interview, recaptchaRef }) {
  const [answers] = useState([]);
  const [summary, setSummary] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const answerQuestions = (event) => {
    event.preventDefault();

    setError(null);
    setMessage(null);
    setLoading(true);

    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .answerQuestions(interview, summary, answers, recaptcha)
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
    let index = answers.findIndex((a) => {
      return a.id === event.target.id;
    });

    answers[index].value = event.target.value;
  };

  const changeSummary = (event) => {
    setSummary(event.target.value);
  };

  const getQuestions = useCallback(() => {
    facade
      .getInterviewById(interview)
      .then((response) => {
        let sum = response.summary;
        setSummary(sum ? sum : "");
        setData(
          response.questions.map((question) => {
            let userAnswer = question.answers.find((answer) => {
              return answer.user_id === facade.getUserId();
            });

            answers.push({
              id: question.id,
              value: userAnswer ? userAnswer.answer : "",
            });

            return (
              <Form.Group className="mb-3" key={question.id}>
                <Form.Label key={question.id + "_header"}>
                  {question.question}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  key={question.id + "_answer"}
                  id={question.id}
                  onChange={onChange}
                  defaultValue={
                    answers.find((answer) => {
                      return answer.id === question.id;
                    }).value
                  }
                />
              </Form.Group>
            );
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setError(e.message);
            setLoading(false);
            setOpen(false);
          });

          return;
        }

        setError("Der opstod en uventet fejl, prøv igen senere");
        setLoading(false);
        setOpen(false);
      });
  }, [setData]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Segment loading={loading}>
          <Collapse in={open}>
            <Container>
              <Form>
                <Modal.Title>Spørgsmål</Modal.Title>
                {data}
                <Modal.Title>Opsumering</Modal.Title>
                <Form.Group className="mb-3" key="summary">
                  <Form.Control
                    as="textarea"
                    rows="3"
                    id="summary"
                    onChange={changeSummary}
                    defaultValue={summary}
                  />
                </Form.Group>
                <Row className="mb-3 mt-3">
                  <Button variant="primary" onClick={answerQuestions}>
                    Gem Svar
                  </Button>
                </Row>
              </Form>
            </Container>
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
