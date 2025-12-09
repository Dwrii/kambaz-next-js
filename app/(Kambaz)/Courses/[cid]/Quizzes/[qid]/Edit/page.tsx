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

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactQuill = dynamic<any>(
  () => import("react-quill-new").then((mod) => mod.default),
  { ssr: false }
);

const QUIZ_TYPE_LABELS = {
  GRADED: "Graded Quiz",
  PRACTICE: "Practice Quiz",
  GRADED_SURVEY: "Graded Survey",
  UNGRADED_SURVEY: "Ungraded Survey",
} as const;

type QuizType = keyof typeof QUIZ_TYPE_LABELS;

const ASSIGNMENT_GROUP_LABELS = {
  QUIZZES: "Quizzes",
  EXAMS: "Exams",
  ASSIGNMENTS: "Assignments",
  PROJECT: "Project",
} as const;

type AssignmentGroup = keyof typeof ASSIGNMENT_GROUP_LABELS;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Quiz = any;

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const loadQuiz = async () => {
    if (!qid) return;
    const data = await client.findQuiz(qid);

    const safeQuiz: Quiz = {
      ...data,
      title: data.title || "New Quiz",
      description: data.description || "",
      quizType: (data.quizType as QuizType) || "GRADED",
      assignmentGroup: (data.assignmentGroup as AssignmentGroup) || "QUIZZES",
      shuffleAnswers: data.shuffleAnswers ?? true,
      timeLimit: typeof data.timeLimit === "number" ? data.timeLimit : 0, // 0 = None
      multipleAttempts: data.multipleAttempts ?? false,
      attemptsAllowed: data.attemptsAllowed ?? 1,
      showCorrectAnswers: data.showCorrectAnswers || "Immediately",
      accessCode: data.accessCode || "",
      oneQuestionAtATime: data.oneQuestionAtATime ?? true,
      webcamRequired: data.webcamRequired ?? false,
      lockAfterAnswering: data.lockAfterAnswering ?? false,
      dueDate: data.dueDate || "",
      availableDate: data.availableDate || "",
      untilDate: data.untilDate || "",
    };

    setQuiz(safeQuiz);
  };

  useEffect(() => {
    loadQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: string, value: any) => {
    setQuiz({ ...quiz, [field]: value });
  };

  const buildPayload = () => ({
    title: quiz.title,
    description: quiz.description,
    quizType: quiz.quizType as QuizType,
    assignmentGroup: quiz.assignmentGroup as AssignmentGroup,
    shuffleAnswers: !!quiz.shuffleAnswers,
    timeLimit: quiz.timeLimit,
    multipleAttempts: !!quiz.multipleAttempts,
    attemptsAllowed: quiz.multipleAttempts ? quiz.attemptsAllowed : undefined,
    showCorrectAnswers: quiz.showCorrectAnswers,
    accessCode: quiz.accessCode,
    oneQuestionAtATime: !!quiz.oneQuestionAtATime,
    webcamRequired: !!quiz.webcamRequired,
    lockAfterAnswering: !!quiz.lockAfterAnswering,
    dueDate: quiz.dueDate || "",
    availableDate: quiz.availableDate || "",
    untilDate: quiz.untilDate || "",
  });

  const save = async () => {
    const payload = buildPayload();
    await client.updateQuiz(qid, payload);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const saveAndPublish = async () => {
    const payload = { ...buildPayload(), published: true };
    await client.updateQuiz(qid, payload);
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

      <div className="d-flex justify-content-between align-items-end mb-3">
        <Form.Group className="flex-grow-1 me-4">
          <Form.Label className="fw-semibold">Quiz Title</Form.Label>
          <Form.Control
            type="text"
            value={quiz.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </Form.Group>

        <div className="text-end">
          <div className="fw-semibold">Points</div>
          <div className="fs-4">{quiz.points ?? 0}</div>
        </div>
      </div>

      <Form.Group className="mb-4">
  <Form.Label className="fw-semibold">Quiz Instructions:</Form.Label>
  <div className="wd-quiz-editor-description">
    <ReactQuill
      theme="snow"
      value={quiz.description || ""}
      onChange={(value: string) => updateField("description", value)}
    />
  </div>
</Form.Group>

      <Card className="wd-quiz-card mb-4">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Quiz Type</Form.Label>
            <Form.Select
              value={quiz.quizType}
              onChange={(e) =>
                updateField("quizType", e.target.value as QuizType)
              }
            >
              <option value="GRADED">Graded Quiz</option>
              <option value="PRACTICE">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Assignment Group</Form.Label>
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) =>
                updateField(
                  "assignmentGroup",
                  e.target.value as AssignmentGroup
                )
              }
            >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </Form.Select>
          </Form.Group>

          <div className="fw-semibold mt-4 mb-2">Options</div>

          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={!!quiz.shuffleAnswers}
            onChange={(e) => updateField("shuffleAnswers", e.target.checked)}
          />

          <Row className="mt-3 mb-3">
            <Col sm={4}>
              <Form.Check
                type="checkbox"
                label="Time Limit"
                checked={(quiz.timeLimit as number) > 0}
                onChange={(e) =>
                  updateField("timeLimit", e.target.checked ? 20 : 0)
                }
              />
            </Col>
            <Col sm={4}>
              {(quiz.timeLimit as number) > 0 && (
                <Form.Control
                  type="number"
                  value={quiz.timeLimit as number}
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
            checked={!!quiz.multipleAttempts}
            onChange={(e) =>
              updateField("multipleAttempts", e.target.checked)
            }
          />

          {quiz.multipleAttempts && (
            <Row className="mt-2">
              <Col sm={4}>Attempts Allowed</Col>
              <Col sm={3}>
                <Form.Control
                  type="number"
                  value={quiz.attemptsAllowed as number}
                  onChange={(e) =>
                    updateField("attemptsAllowed", Number(e.target.value))
                  }
                />
              </Col>
            </Row>
          )}

          <Form.Group className="mt-4">
            <Form.Label className="fw-semibold">Show Correct Answers</Form.Label>
            <Form.Select
              value={quiz.showCorrectAnswers as string}
              onChange={(e) =>
                updateField("showCorrectAnswers", e.target.value)
              }
            >
              <option value="Immediately">Immediately</option>
              <option value="After Due Date">After Due Date</option>
              <option value="Never">Never</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="fw-semibold">Access Code</Form.Label>
            <Form.Control
              type="text"
              value={quiz.accessCode as string}
              onChange={(e) => updateField("accessCode", e.target.value)}
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            className="mt-3"
            label="One Question at a Time"
            checked={!!quiz.oneQuestionAtATime}
            onChange={(e) =>
              updateField("oneQuestionAtATime", e.target.checked)
            }
          />

          <Form.Check
            type="checkbox"
            className="mt-2"
            label="Webcam Required"
            checked={!!quiz.webcamRequired}
            onChange={(e) => updateField("webcamRequired", e.target.checked)}
          />

          <Form.Check
            type="checkbox"
            className="mt-2"
            label="Lock Questions After Answering"
            checked={!!quiz.lockAfterAnswering}
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
                value={(quiz.dueDate as string) || ""}
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
                onChange={(e) =>
                  updateField("availableDate", e.target.value)
                }
              />
            </Col>

            <Col sm={4}>
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="datetime-local"
                value={(quiz.untilDate as string) || ""}
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
          Save &amp; Publish
        </Button>
      </div>
    </div>
  );
}
