"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";

import * as client from "../client";
import "../../Quizzes/quizdetail.css";

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  quizType?: string;         
  points?: number;
  assignmentGroup?: string;   
  shuffleAnswers?: boolean;
  timeLimit?: number;
  multipleAttempts?: boolean;
  attemptsAllowed?: number;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockAfterAnswering?: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
}

interface RootState {
  accountReducer: { currentUser: { role?: string } | null };
}

const QUIZ_TYPE_LABELS = {
  GRADED: "Graded Quiz",
  PRACTICE: "Practice Quiz",
  GRADED_SURVEY: "Graded Survey",
  UNGRADED_SURVEY: "Ungraded Survey",
} as const;

type QuizTypeCode = keyof typeof QUIZ_TYPE_LABELS;

const ASSIGNMENT_GROUP_LABELS = {
  QUIZZES: "Quizzes",
  EXAMS: "Exams",
  ASSIGNMENTS: "Assignments",
  PROJECT: "Project",
} as const;

type AssignmentGroupCode = keyof typeof ASSIGNMENT_GROUP_LABELS;

const getQuizTypeLabel = (code?: string) =>
  QUIZ_TYPE_LABELS[code as QuizTypeCode] ?? "Graded Quiz";

const getAssignmentGroupLabel = (code?: string) =>
  ASSIGNMENT_GROUP_LABELS[code as AssignmentGroupCode] ?? "Quizzes";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty =
    currentUser?.role === "ADMIN" ||
    currentUser?.role === "FACULTY" ||
    currentUser?.role === "TA";

  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const loadQuiz = async () => {
    if (!qid) return;
    const data = await client.findQuiz(qid);

    const safeQuiz: Quiz = {
      ...data,
      title: data.title || "New Quiz",
      description: data.description || "",
      quizType: (data.quizType as string) || "GRADED",
      assignmentGroup: (data.assignmentGroup as string) || "QUIZZES",
      shuffleAnswers: data.shuffleAnswers ?? true,
      timeLimit: typeof data.timeLimit === "number" ? data.timeLimit : 0,
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

  return (
    <div className="wd-quiz-details-container">
      <div className="wd-quiz-top-buttons">
        {isFaculty && (
          <>
            <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`}>
              <Button className="wd-quiz-btn">Preview</Button>
            </Link>

            <Link href={`/Courses/${cid}/Quizzes/${qid}/Edit`}>
              <Button className="wd-quiz-btn">
                <FaPencilAlt className="me-2" />
                Edit
              </Button>
            </Link>
          </>
        )}

        {isStudent && (
          <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`}>
            <Button className="wd-quiz-btn-start">Start Quiz</Button>
          </Link>
        )}
      </div>

      <div className="wd-quiz-title-box">
        <h2 className="wd-quiz-title">{quiz.title || "New Quiz"}</h2>
      </div>

      <div className="wd-quiz-properties-box">
        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Quiz Type</span>
          <span className="wd-prop-value">
            {getQuizTypeLabel(quiz.quizType)}
          </span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Points</span>
          <span className="wd-prop-value">{quiz.points ?? 0}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Assignment Group</span>
          <span className="wd-prop-value">
            {getAssignmentGroupLabel(quiz.assignmentGroup)}
          </span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Shuffle Answers</span>
          <span className="wd-prop-value">
            {(quiz.shuffleAnswers ?? true) ? "Yes" : "No"}
          </span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Time Limit</span>
          <span className="wd-prop-value">
            {quiz.timeLimit && quiz.timeLimit > 0
              ? `${quiz.timeLimit} Minutes`
              : "None"}
          </span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Multiple Attempts</span>
          <span className="wd-prop-value">
            {quiz.multipleAttempts ? "Yes" : "No"}
          </span>
        </div>

        {quiz.multipleAttempts && (
          <div className="wd-quiz-prop">
            <span className="wd-prop-label">How Many Attempts</span>
            <span className="wd-prop-value">
              {quiz.attemptsAllowed ?? 1}
            </span>
          </div>
        )}

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Show Correct Answers</span>
          <span className="wd-prop-value">
            {quiz.showCorrectAnswers || "Immediately"}
          </span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Access Code</span>
          <span className="wd-prop-value">
            {quiz.accessCode || "None"}
          </span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">One Question at a Time</span>
          <span className="wd-prop-value">
            {(quiz.oneQuestionAtATime ?? true) ? "Yes" : "No"}
          </span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Webcam Required</span>
          <span className="wd-prop-value">
            {quiz.webcamRequired ? "Yes" : "No"}
          </span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Lock Questions After Answering</span>
          <span className="wd-prop-value">
            {quiz.lockAfterAnswering ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <table className="wd-quiz-due-table">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "—"}
            </td>
            <td>Everyone</td>
            <td>
              {quiz.availableDate
                ? new Date(quiz.availableDate).toLocaleString()
                : "—"}
            </td>
            <td>
              {quiz.untilDate
                ? new Date(quiz.untilDate).toLocaleString()
                : "—"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
