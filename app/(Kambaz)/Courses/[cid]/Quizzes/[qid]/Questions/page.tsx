"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import * as client from "../../client";
import "./quiz-questions.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactQuill = dynamic<any>(
  () => import("react-quill-new").then((mod) => mod.default),
  { ssr: false }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Question = any;

type QuestionGroup = {
  id: string;
  name: string;
};

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [groups, setGroups] = useState<QuestionGroup[]>([
    { id: "default", name: "Group 1" },
  ]);

  const [questionBank, setQuestionBank] = useState<Question[]>([]);
  const [showBank, setShowBank] = useState(false);
  const [bankSearch, setBankSearch] = useState("");

  const loadQuiz = async () => {
    const data = await client.findQuiz(qid);
    setQuiz(data);

    const qs = (data.questions || []).map((q: Question) => ({
      ...q,
      editing: false,
      backup: undefined,
      isNew: false,
    }));
    setQuestions(qs);

    setQuestionBank(data.questions || []);

    if (data.questionGroups) {
      setGroups(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.questionGroups.map((g: any) => ({
          id: g.id,
          name: g.name
        }))
      );
    
      setQuestions((prev) =>
        prev.map(q => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const found = data.questionGroups.find((g: any) =>
            g.questionIds.includes(q._id)
          );
          return {
            ...q,
            groupId: found ? found.id : null
          };
        })
      );
    }
    
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  if (!quiz) return <div>Loading...</div>;

  const buildCleanQuestions = (qs: Question[]) =>
    qs.map(({ editing, backup, isNew, ...rest }) => rest);

  const computeTotalPoints = (qs: Question[]) =>
    qs.reduce((s, q) => s + Number(q.points || 0), 0);

  const addNewQuestion = () => {
    const newQuestion: Question = {
      _id: Date.now().toString(),
      title: "New Question",
      type: "multiple",
      points: 1,
      text: "",
      correctAnswer: "",
      choices: ["Option 1", "Option 2"],
      editing: true,
      backup: undefined,
      isNew: true,
      groupId: groups[0]?.id ?? null,
    };

    setQuestions((prev) => [...prev, newQuestion]);
  };

  const startEditing = (index: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const q = updated[index];

      if (!q.backup) {
        const { editing, backup, isNew, ...snapshot } = q;
        updated[index] = {
          ...q,
          editing: true,
          backup: snapshot,
        };
      } else {
        updated[index] = { ...q, editing: true };
      }

      return updated;
    });
  };

  const cancelEdit = (index: number) => {
    setQuestions((prev) => {
      const q = prev[index];

      if (q.isNew && !q.backup) {
        return prev.filter((_, i) => i !== index);
      }

      const updated = [...prev];

      if (q.backup) {
        updated[index] = {
          ...q.backup,
          editing: false,
          backup: undefined,
          isNew: false,
        };
      } else {
        updated[index] = { ...q, editing: false };
      }

      return updated;
    });
  };

  const saveQuestion = async (index: number) => {
    const finalized = questions.map((q, i) =>
      i === index
        ? { ...q, editing: false, backup: undefined, isNew: false }
        : q
    );
    setQuestions(finalized);

    const cleaned = buildCleanQuestions(finalized);
    const totalPoints = computeTotalPoints(cleaned);

    const updatedQuiz = {
      ...quiz,
      questions: cleaned,
      points: totalPoints,
      questionGroups: groups.map(g => ({
        id: g.id,
        name: g.name,
        questionIds: cleaned
          .filter(q => q.groupId === g.id)
          .map(q => q._id)
      }))
    };

    await client.updateQuiz(qid, updatedQuiz);
    setQuiz(updatedQuiz);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateQuestionField = (index: number, field: string, value: any) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const saveAll = async () => {
    const finalized = questions.map((q) => ({ ...q, editing: false }));

    const cleaned = buildCleanQuestions(finalized);
    const totalPoints = computeTotalPoints(cleaned);

    const updatedQuiz = {
      ...quiz,
      questions: cleaned,
      points: totalPoints,
      questionGroups: groups.map(g => ({
        id: g.id,
        name: g.name,
        questionIds: cleaned
          .filter(q => q.groupId === g.id)
          .map(q => q._id)
      }))
    };

    await client.updateQuiz(qid, updatedQuiz);
    setQuiz(updatedQuiz);

    setQuestions(
      cleaned.map((q: Question) => ({
        ...q,
        editing: false,
        backup: undefined,
        isNew: false,
      }))
    );
  };

  const totalPoints = computeTotalPoints(questions);

  const addQuestionFromBank = (bankQuestion: Question) => {
    const cloned: Question = {
      ...bankQuestion,
      _id: Date.now().toString() + Math.random().toString(16).slice(2),
      editing: false,
      backup: undefined,
      isNew: true,
      groupId: groups[0]?.id ?? null,
    };
    setQuestions((prev) => [...prev, cloned]);
  };

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

      <div className="mb-3 d-flex gap-2 align-items-center">
        <span className="fw-bold">Question Groups:</span>
        {groups.map((g) => (
          <span key={g.id} className="badge bg-secondary me-1">
            {g.name}
          </span>
        ))}
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() =>
            setGroups((prev) => [
              ...prev,
              {
                id: `g-${Date.now()}`,
                name: `Group ${prev.length + 1}`,
              },
            ])
          }
        >
          + Add Group
        </Button>
      </div>

      <div className="wd-new-question-container mb-3 d-flex gap-2">
        <Button
          variant="light"
          className="wd-new-question-btn"
          onClick={addNewQuestion}
        >
          + New Question
        </Button>

        <Button
          variant="outline-secondary"
          onClick={() => setShowBank((s) => !s)}
        >
          Find Questions
        </Button>
      </div>

      {showBank && (
        <Card className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>Question Bank</strong>
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => setShowBank(false)}
              >
                Close
              </Button>
            </div>

            <Form.Control
              type="text"
              placeholder="Search questions..."
              className="mb-2"
              value={bankSearch}
              onChange={(e) => setBankSearch(e.target.value)}
            />

            {questionBank
              .filter((qb) =>
                (qb.title || "")
                  .toLowerCase()
                  .includes(bankSearch.toLowerCase())
              )
              .map((qb) => (
                <div
                  key={qb._id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div>
                    <div className="fw-bold">{qb.title || "(Untitled)"}</div>
                    <div className="text-muted">
                      {qb.type} — {qb.points ?? 0} pts
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => addQuestionFromBank(qb)}
                  >
                    Add to Quiz
                  </Button>
                </div>
              ))}

            {questionBank.length === 0 && (
              <div className="text-muted fst-italic">
                No questions in the bank yet.
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      {questions.length === 0 && (
        <div className="text-muted fst-italic mb-3">
          No questions yet. Click <strong>+ New Question</strong> to add your
          first question.
        </div>
      )}

      {questions.map((q, index) => (
        <Card key={q._id} className="wd-question-card mt-3">
          <Card.Body>
            {!q.editing && (
              <>
                <Row className="align-items-center mb-2">
                  <Col>
                    <h5>{q.title}</h5>
                    <div className="text-muted">
                      {q.type === "multiple"
                        ? "Multiple Choice"
                        : q.type === "truefalse"
                        ? "True / False"
                        : "Fill in the Blank"}{" "}
                      — {q.points} pts
                    </div>
                    {q.groupId && (
                      <div className="text-muted">
                        Group:{" "}
                        {groups.find((g) => g.id === q.groupId)?.name ||
                          "Unknown"}
                      </div>
                    )}
                  </Col>

                  <Col sm="auto">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => startEditing(index)}
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>

                <div className="mb-2 fw-bold">Question:</div>
                <div
                  className="ms-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      q.text || "<span style='color:#888'>(No text)</span>",
                  }}
                />

                <div className="mt-3 fw-bold">Answers:</div>
                {q.type === "multiple" &&
                  (q.choices || []).map((choice: string, i: number) => (
                    <div key={i} className="ms-3">
                      {q.correctAnswer === choice ? "✓ " : ""}
                      {choice}
                    </div>
                  ))}

                {q.type === "truefalse" && (
                  <div className="ms-3">
                    Correct: {q.correctAnswer === "true" ? "True" : "False"}
                  </div>
                )}

                {q.type === "fill" && (
                  <div className="ms-3">
                    Correct Answers:{" "}
                    {(q.choices || []).length > 0
                      ? q.choices.join(", ")
                      : "(none)"}
                  </div>
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
                        updateQuestionField(index, "title", e.target.value)
                      }
                    />
                  </Col>

                  <Col sm={3}>
                    <Form.Select
                      value={q.type}
                      onChange={(e) =>
                        updateQuestionField(index, "type", e.target.value)
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
                        updateQuestionField(
                          index,
                          "points",
                          Number(e.target.value)
                        )
                      }
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Label className="fw-bold">Question Group</Form.Label>
                    <Form.Select
                      value={q.groupId || ""}
                      onChange={(e) =>
                        updateQuestionField(
                          index,
                          "groupId",
                          e.target.value || null
                        )
                      }
                    >
                      <option value="">No Group</option>
                      {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Form.Label className="fw-bold">Question:</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={q.text || ""}
                  onChange={(value: string) =>
                    updateQuestionField(index, "text", value)
                  }
                  className="mb-3 wd-question-editor"
                />

                {q.type === "multiple" && (
                  <div>
                    <Form.Label className="fw-bold">Answers:</Form.Label>

                    {(q.choices || []).map(
                      (choice: string, ci: number) => (
                        <Row key={ci} className="mb-2 align-items-center">
                          <Col sm={1}>
                            <Form.Check
                              type="radio"
                              name={`correct-${index}`}
                              checked={q.correctAnswer === choice}
                              onChange={() =>
                                updateQuestionField(
                                  index,
                                  "correctAnswer",
                                  choice
                                )
                              }
                            />
                          </Col>

                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              value={choice}
                              onChange={(e) => {
                                const newChoices = [...(q.choices || [])];
                                newChoices[ci] = e.target.value;
                                updateQuestionField(
                                  index,
                                  "choices",
                                  newChoices
                                );
                              }}
                            />
                          </Col>

                          <Col sm={2}>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                const newChoices = (q.choices || []).filter(
                                  (_: string, j: number) => j !== ci
                                );
                                updateQuestionField(
                                  index,
                                  "choices",
                                  newChoices
                                );
                                if (q.correctAnswer === choice) {
                                  updateQuestionField(
                                    index,
                                    "correctAnswer",
                                    ""
                                  );
                                }
                              }}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      )
                    )}

                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuestionField(index, "choices", [
                          ...(q.choices || []),
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
                        updateQuestionField(index, "correctAnswer", "true")
                      }
                    />

                    <Form.Check
                      type="radio"
                      label="False"
                      name={`tf-${index}`}
                      checked={q.correctAnswer === "false"}
                      onChange={() =>
                        updateQuestionField(index, "correctAnswer", "false")
                      }
                    />
                  </div>
                )}

                {q.type === "fill" && (
                  <div>
                    <Form.Label className="fw-bold">
                      Possible Correct Answers:
                    </Form.Label>

                    {(q.choices || []).map(
                      (ans: string, ai: number) => (
                        <Row key={ai} className="mb-2 align-items-center">
                          <Col sm={10}>
                            <Form.Control
                              type="text"
                              value={ans}
                              onChange={(e) => {
                                const newAnswers = [...(q.choices || [])];
                                newAnswers[ai] = e.target.value;
                                updateQuestionField(
                                  index,
                                  "choices",
                                  newAnswers
                                );
                              }}
                            />
                          </Col>

                          <Col sm={2}>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                const newAnswers = (q.choices || []).filter(
                                  (_: string, j: number) => j !== ai
                                );
                                updateQuestionField(
                                  index,
                                  "choices",
                                  newAnswers
                                );
                              }}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      )
                    )}

                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuestionField(index, "choices", [
                          ...(q.choices || []),
                          "New Answer",
                        ])
                      }
                    >
                      + Add Answer
                    </Button>
                  </div>
                )}

                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => cancelEdit(index)}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    className="ms-2"
                    variant="danger"
                    onClick={() => saveQuestion(index)}
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
          onClick={() =>
            router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)
          }
        >
          Preview Quiz
        </Button>
      </div>
    </div>
  );
}
