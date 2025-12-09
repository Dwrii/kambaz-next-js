"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaCircle,
} from "react-icons/fa";

import * as client from "../../client";
import "./quiz-preview.css";

type Question = {
  _id: string;
  type: "multiple" | "truefalse" | "fill";
  text: string;
  points: number;
  choices?: string[];
  correctAnswer: string;
};

type Quiz = {
  title: string;
  description?: string;
  questions?: Question[];
};

export default function QuizPreview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quiz, setQuiz] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [questions, setQuestions] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answers, setAnswers] = useState<any>({});

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const loadQuiz = async () => {
    const data = (await client.findQuiz(qid)) as Quiz;
    setQuiz(data);
    setQuestions(data.questions || []);
    setCurrentIndex(0);
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  if (!quiz) return <div>Loading...</div>;

  const isOneAtATime = !!quiz.oneQuestionAtATime;

  const handleChange = (questionId: string, value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAnswers((prev: any) => ({ ...prev, [questionId]: value }));
  };

  const normalize = (s: string) => s.trim().toLowerCase();

  const submitQuiz = () => {
    let correct = 0;

    questions.forEach((q) => {
      const user = answers[q._id];

      if (q.type === "multiple" || q.type === "truefalse") {
        if (user === q.correctAnswer) {
          correct++;
        }
      }

      if (q.type === "fill") {
        const allCorrect = (q.choices || []).map((a: string) => normalize(a));
        if (user && allCorrect.includes(normalize(user))) {
          correct++;
        }
      }
    });

    setScore(correct);
    setSubmitted(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderQuestion = (q: any, index: number) => (
    <div key={q._id} className="quiz-question-box">
      <div className="quiz-question-header">
        <div className="d-flex align-items-center gap-2">
          <Form.Check type="checkbox" disabled />
          <span>Question {index + 1}</span>
        </div>
        <span>{q.points} pts</span>
      </div>

      <div
        className="quiz-question-text"
        dangerouslySetInnerHTML={{
          __html: q.text || "",
        }}
      />

      {q.type === "multiple" &&
        (q.choices || []).map((choice: string) => (
          <Form.Check
            key={choice}
            type="radio"
            name={q._id}
            label={choice}
            checked={answers[q._id] === choice}
            onChange={() => handleChange(q._id, choice)}
          />
        ))}

      {q.type === "truefalse" && (
        <>
          <Form.Check
            type="radio"
            label="True"
            name={q._id}
            checked={answers[q._id] === "true"}
            onChange={() => handleChange(q._id, "true")}
          />
          <Form.Check
            type="radio"
            label="False"
            name={q._id}
            checked={answers[q._id] === "false"}
            onChange={() => handleChange(q._id, "false")}
          />
        </>
      )}

      {q.type === "fill" && (
        <Form.Control
          type="text"
          placeholder="Enter your answer"
          value={answers[q._id] || ""}
          onChange={(e) => handleChange(q._id, e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div className="quiz-container mt-4">
      <h2>{quiz.title}</h2>

      {questions.length > 0 ? (
        <div className="quiz-banner mt-3">
          <FaExclamationTriangle className="text-danger" />
          <span>This is a preview of the published version of the quiz</span>
        </div>
      ) : (
        <div className="quiz-banner mt-3">
          <FaExclamationTriangle className="text-warning" />
          <span>This quiz has no questions yet — please edit the quiz.</span>
        </div>
      )}

      <div className="text-muted mt-3">
        Started: {new Date().toLocaleString()}
      </div>

      <h4 className="mt-4 mb-3">Quiz Instructions</h4>
      <div
        className="quiz-instructions"
        dangerouslySetInnerHTML={{
          __html: quiz.description || "<em>(No instructions)</em>",
        }}
      />

      {!submitted && (
        <>
          {isOneAtATime ? (
            questions.length > 0 &&
            renderQuestion(questions[currentIndex], currentIndex)
          ) : (
            questions.map((q, index) => renderQuestion(q, index))
          )}

          {isOneAtATime && questions.length > 0 && (
            <div className="question-pager mt-3 mb-3">
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
              >
                Previous
              </Button>

              <span className="mx-3">
                Question {currentIndex + 1} of {questions.length}
              </span>

              <Button
                variant="outline-secondary"
                size="sm"
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                Next
              </Button>
            </div>
          )}

          <div className="quiz-submit-row">
            <span className="text-muted">
              Quiz saved at {new Date().toLocaleTimeString()}
            </span>

            <Button variant="primary" onClick={submitQuiz}>
              Submit Quiz
            </Button>
          </div>

          <Button
            className="keep-editing-btn"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`)
            }
          >
            Edit Quiz
          </Button>

          <div className="question-nav">
            <h5>Questions</h5>
            <ul className="question-nav-list">
              {questions.map((q, i) => (
                <li key={q._id}>
                  <button
                    type="button"
                    className={
                      "question-nav-link" +
                      (i === currentIndex ? " active" : "")
                    }
                    onClick={() => setCurrentIndex(i)}
                  >
                    <FaCircle
                      style={{ fontSize: "8px", marginRight: "6px" }}
                    />
                    Question {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      {submitted && (
        <div className="mt-4">
          <h3>Results</h3>
          <p>
            Score: <strong>{score}</strong> / {questions.length}
          </p>

          {questions.map((q, index) => {
            const user = answers[q._id];

            let isCorrect = false;
            if (q.type === "fill") {
              const allCorrect = (q.choices || []).map((a: string) =>
                normalize(a)
              );
              isCorrect =
                !!user && allCorrect.includes(normalize(String(user)));
            } else {
              isCorrect = user === q.correctAnswer;
            }

            return (
              <Card key={q._id} className="mb-3">
                <Card.Body>
                  <h5 className="d-flex align-items-center gap-2">
                    Question {index + 1} —
                    {isCorrect ? (
                      <span className="text-success d-flex align-items-center gap-1">
                        <FaCheckCircle /> Correct
                      </span>
                    ) : (
                      <span className="text-danger d-flex align-items-center gap-1">
                        <FaTimesCircle /> Incorrect
                      </span>
                    )}
                  </h5>

                  <div
                    className="quiz-question-text mb-2"
                    dangerouslySetInnerHTML={{ __html: q.text || "" }}
                  />

                  <p>
                    <strong>Your answer:</strong>{" "}
                    {user ? user : <em>(blank)</em>}
                  </p>
                  <p>
                    <strong>Correct answer</strong>
                    {q.type === "fill"
                      ? `: ${(q.choices || []).join(", ")}`
                      : `: ${q.correctAnswer}`}
                  </p>
                </Card.Body>
              </Card>
            );
          })}

          <Button
            className="keep-editing-btn"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`)
            }
          >
            Edit Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
