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
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  attemptsAllowed: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockAfterAnswering: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
}

interface RootState {
  accountReducer: { currentUser: { role?: string } | null };
}

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
    if (qid) {
      const data = await client.findQuiz(qid);
      setQuiz(data);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="wd-quiz-details-container">
      <div className="wd-quiz-top-buttons">
        <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`}>
          <Button className="wd-quiz-btn">Preview</Button>

        </Link>
        <Link href={`/Courses/${cid}/Quizzes/${qid}/Edit`}>
          <Button className="wd-quiz-btn">
            <FaPencilAlt className="me-2" />
            Edit
          </Button>
        </Link>

        {isStudent && (
          <Link href={`/Courses/${cid}/Quizzes/${qid}/Start`}>
            <Button className="wd-quiz-btn-start">Start Quiz</Button>
          </Link>
        )}
      </div>

      <div className="wd-quiz-title-box">
        <h2 className="wd-quiz-title">{quiz.title}</h2>
      </div>

      <div className="wd-quiz-properties-box">
        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Quiz Type</span>
          <span>{quiz.quizType}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Points</span>
          <span>{quiz.points}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Assignment Group</span>
          <span>{quiz.assignmentGroup}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Shuffle Answers</span>
          <span>{quiz.shuffleAnswers ? "Yes" : "No"}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Time Limit</span>
          <span>{quiz.timeLimit} Minutes</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Multiple Attempts</span>
          <span>{quiz.multipleAttempts ? "Yes" : "No"}</span>
        </div>

        {quiz.multipleAttempts && (
          <div className="wd-quiz-prop">
            <span className="wd-prop-label">How Many Attempts</span>
            <span>{quiz.attemptsAllowed}</span>
          </div>
        )}

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Show Correct Answers</span>
          <span>{quiz.showCorrectAnswers}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Access Code</span>
          <span>{quiz.accessCode || "None"}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">One Question at a Time</span>
          <span>{quiz.oneQuestionAtATime ? "Yes" : "No"}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Webcam Required</span>
          <span>{quiz.webcamRequired ? "Yes" : "No"}</span>
        </div>

        <div className="wd-quiz-prop">
          <span className="wd-prop-label">Lock Questions After Answering</span>
          <span>{quiz.lockAfterAnswering ? "Yes" : "No"}</span>
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
              {quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "—"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
