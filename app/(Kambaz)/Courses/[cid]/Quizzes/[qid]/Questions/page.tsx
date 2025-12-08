"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import * as client from "../../client";
import "./quiz-questions.css";

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any>(null);

  const loadQuiz = async () => {
    const data = await client.findQuiz(qid);
    setQuiz(data);
    setQuestions(data.questions || []);
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  if (!quiz) return <div>Loading...</div>;

  const addNewQuestion = () => {
    const newQuestion = {
      _id: Date.now().toString(),
      title: "New Question",
      type: "multiple",
      points: 1,
      text: "",
      correctAnswer: "",
      choices: ["Option 1", "Option 2"],
      editing: true,
    };

    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const saveAll = async () => {
    const cleaned = questions.map((q) => ({ ...q, editing: false }));

    setQuestions(cleaned);

    await client.updateQuiz(qid, { ...quiz, questions: cleaned });
  };

  const totalPoints = questions.reduce((s, q) => s + Number(q.points || 0), 0);

  return (
    <div className="wd-qq-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="wd-tabs">
          <Link href={`/Courses/${cid}/Quizzes/${qid}/Edit`} className="wd-tab">
            Details
          </Link>

          <Link
            href={`/Courses/${cid}/Quizzes/${qid}/Questions`}
            className="wd-tab active"
          >
            Questions
          </Link>
        </div>

        <div className="wd-points-display">Points {totalPoints}</div>
      </div>

      <div className="wd-new-question-container">
        <Button
          variant="light"
          className="wd-new-question-btn"
          onClick={addNewQuestion}
        >
          + New Question
        </Button>
      </div>

      {questions.map((q, index) => (
        <Card key={q._id} className="wd-question-card mt-3">
          <Card.Body>
            {!q.editing && (
              <>
                <Row className="align-items-center mb-2">
                  <Col>
                    <h5>{q.title}</h5>
                    <div className="text-muted">
                      {q.type} — {q.points} pts
                    </div>
                  </Col>

                  <Col sm="auto">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => updateQuestion(index, "editing", true)}
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>

                <div className="mb-2 fw-bold">Question:</div>
                <div className="ms-2">{q.text || "(No text)"}</div>

                <div className="mt-3 fw-bold">Answers:</div>
                {q.type === "multiple" &&
                  q.choices.map((c: string, i: number) => (
                    <div key={i} className="ms-3">
                      {q.correctAnswer === c ? "✓ " : ""} {c}
                    </div>
                  ))}

                {q.type === "truefalse" && (
                  <div className="ms-3">
                    Correct: {q.correctAnswer === "true" ? "True" : "False"}
                  </div>
                )}

                {q.type === "fill" && (
                  <div className="ms-3">Correct Answer: {q.correctAnswer}</div>
                )}
              </>
            )}

            {q.editing && (
              <>
                <Row className="align-items-center mb-3">
                  <Col sm={7}>
                    <Form.Control
                      type="text"
                      value={q.title}
                      onChange={(e) =>
                        updateQuestion(index, "title", e.target.value)
                      }
                    />
                  </Col>

                  <Col sm={3}>
                    <Form.Select
                      value={q.type}
                      onChange={(e) =>
                        updateQuestion(index, "type", e.target.value)
                      }
                    >
                      <option value="multiple">Multiple Choice</option>
                      <option value="truefalse">True / False</option>
                      <option value="fill">Fill in the Blank</option>
                    </Form.Select>
                  </Col>

                  <Col sm={2}>
                    <Form.Control
                      type="number"
                      value={q.points}
                      onChange={(e) =>
                        updateQuestion(index, "points", Number(e.target.value))
                      }
                    />
                  </Col>
                </Row>

                <Form.Label className="fw-bold">Question:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={q.text}
                  onChange={(e) =>
                    updateQuestion(index, "text", e.target.value)
                  }
                  className="mb-3"
                />

                {q.type === "multiple" && (
                  <div>
                    <Form.Label className="fw-bold">Answers:</Form.Label>

                    {q.choices.map((choice: string, ci: number) => (
                      <Row key={ci} className="mb-2 align-items-center">
                        <Col sm={1}>
                          <Form.Check
                            type="radio"
                            name={`correct-${index}`}
                            checked={q.correctAnswer === choice}
                            onChange={() =>
                              updateQuestion(index, "correctAnswer", choice)
                            }
                          />
                        </Col>

                        <Col sm={10}>
                          <Form.Control
                            type="text"
                            value={choice}
                            onChange={(e) => {
                              const newChoices = [...q.choices];
                              newChoices[ci] = e.target.value;
                              updateQuestion(index, "choices", newChoices);
                            }}
                          />
                        </Col>
                      </Row>
                    ))}

                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuestion(index, "choices", [
                          ...q.choices,
                          "New Option",
                        ])
                      }
                    >
                      + Add Option
                    </Button>
                  </div>
                )}

                {q.type === "truefalse" && (
                  <div>
                    <Form.Label className="fw-bold">
                      Select Correct Answer:
                    </Form.Label>

                    <Form.Check
                      type="radio"
                      label="True"
                      name={`tf-${index}`}
                      checked={q.correctAnswer === "true"}
                      onChange={() =>
                        updateQuestion(index, "correctAnswer", "true")
                      }
                    />

                    <Form.Check
                      type="radio"
                      label="False"
                      name={`tf-${index}`}
                      checked={q.correctAnswer === "false"}
                      onChange={() =>
                        updateQuestion(index, "correctAnswer", "false")
                      }
                    />
                  </div>
                )}

                {q.type === "fill" && (
                  <div>
                    <Form.Label className="fw-bold">Correct Answer:</Form.Label>
                    <Form.Control
                      type="text"
                      value={q.correctAnswer}
                      onChange={(e) =>
                        updateQuestion(index, "correctAnswer", e.target.value)
                      }
                    />
                  </div>
                )}

                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => updateQuestion(index, "editing", false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    className="ms-2"
                    variant="danger"
                    onClick={() => updateQuestion(index, "editing", false)}
                  >
                    Update Question
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      ))}

      <div className="wd-buttons-row mt-4 d-flex gap-2">
        <Button variant="danger" onClick={saveAll}>
          Save All Changes
        </Button>

        <Button
          variant="primary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}
        >
          Preview Quiz
        </Button>
      </div>
    </div>
  );
}
