"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { FaSave, FaCheck, FaTimes } from "react-icons/fa";
import * as client from "../../client";

import "./quiz-editor.css";

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);

  const loadQuiz = async () => {
    const data = await client.findQuiz(qid);
    setQuiz({
      ...data,
      description: data.description || "",
    });
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  if (!quiz) return <div>Loading...</div>;

  const updateField = (field: string, value: any) => {
    setQuiz({ ...quiz, [field]: value });
  };

  const save = async () => {
    await client.updateQuiz(qid, quiz);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const saveAndPublish = async () => {
    await client.updateQuiz(qid, { ...quiz, published: true });
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="wd-quiz-editor-container">
      <div className="wd-quiz-tabs">
        <Link
          href={`/Courses/${cid}/Quizzes/${qid}/Edit`}
          className="wd-quiz-tab active"
        >
          Details
        </Link>

        <Link
          href={`/Courses/${cid}/Quizzes/${qid}/Questions`}
          className="wd-quiz-tab"
        >
          Questions
        </Link>
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Quiz Title</Form.Label>
        <Form.Control
          type="text"
          value={quiz.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Quiz Instructions:</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={quiz.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </Form.Group>

      <Card className="wd-quiz-card mb-4">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Quiz Type</Form.Label>
            <Form.Select
              value={quiz.quizType}
              onChange={(e) => updateField("quizType", e.target.value)}
            >
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Graded Survey</option>
              <option>Ungraded Survey</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Assignment Group</Form.Label>
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) => updateField("assignmentGroup", e.target.value)}
            >
              <option>Quizzes</option>
              <option>Exams</option>
              <option>Assignments</option>
              <option>Project</option>
            </Form.Select>
          </Form.Group>

          <div className="fw-semibold mt-4 mb-2">Options</div>

          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(e) => updateField("shuffleAnswers", e.target.checked)}
          />

          <Row className="mt-3 mb-3">
            <Col sm={4}>
              <Form.Check
                type="checkbox"
                label="Time Limit"
                checked={quiz.timeLimit > 0}
                onChange={(e) =>
                  updateField("timeLimit", e.target.checked ? 20 : 0)
                }
              />
            </Col>
            <Col sm={4}>
              {quiz.timeLimit > 0 && (
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    updateField("timeLimit", Number(e.target.value))
                  }
                />
              )}
            </Col>
          </Row>

          <Form.Check
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts}
            onChange={(e) => updateField("multipleAttempts", e.target.checked)}
          />

          {quiz.multipleAttempts && (
            <Row className="mt-2">
              <Col sm={4}>Attempts Allowed</Col>
              <Col sm={3}>
                <Form.Control
                  type="number"
                  value={quiz.attemptsAllowed}
                  onChange={(e) =>
                    updateField("attemptsAllowed", Number(e.target.value))
                  }
                />
              </Col>
            </Row>
          )}

          <Form.Group className="mt-4">
            <Form.Label className="fw-semibold">
              Show Correct Answers
            </Form.Label>
            <Form.Select
              value={quiz.showCorrectAnswers}
              onChange={(e) =>
                updateField("showCorrectAnswers", e.target.value)
              }
            >
              <option>Immediately</option>
              <option>After Due Date</option>
              <option>Never</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="fw-semibold">Access Code</Form.Label>
            <Form.Control
              type="text"
              value={quiz.accessCode}
              onChange={(e) => updateField("accessCode", e.target.value)}
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            className="mt-3"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) =>
              updateField("oneQuestionAtATime", e.target.checked)
            }
          />

          <Form.Check
            type="checkbox"
            className="mt-2"
            label="Webcam Required"
            checked={quiz.webcamRequired}
            onChange={(e) => updateField("webcamRequired", e.target.checked)}
          />

          <Form.Check
            type="checkbox"
            className="mt-2"
            label="Lock Questions After Answering"
            checked={quiz.lockAfterAnswering}
            onChange={(e) =>
              updateField("lockAfterAnswering", e.target.checked)
            }
          />
        </Card.Body>
      </Card>

      <Card className="wd-quiz-card mb-4">
        <Card.Body>
          <div className="fw-semibold mb-3">Assign</div>

          <Row className="mb-3">
            <Col sm={4}>
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="datetime-local"
                value={quiz.dueDate || ""}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={4}>
              <Form.Label>Available From</Form.Label>
              <Form.Control
                type="datetime-local"
                value={quiz.availableDate || ""}
                onChange={(e) => updateField("availableDate", e.target.value)}
              />
            </Col>

            <Col sm={4}>
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="datetime-local"
                value={quiz.untilDate || ""}
                onChange={(e) => updateField("untilDate", e.target.value)}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="wd-quiz-editor-buttons">
        <Button
          variant="secondary"
          className="me-2"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          <FaTimes className="me-2" />
          Cancel
        </Button>

        <Button variant="danger" className="me-2" onClick={save}>
          <FaSave className="me-2" />
          Save
        </Button>

        <Button variant="success" onClick={saveAndPublish}>
          <FaCheck className="me-2" />
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
