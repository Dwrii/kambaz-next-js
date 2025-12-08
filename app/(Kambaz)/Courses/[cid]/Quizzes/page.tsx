"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";

import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaCaretDown, FaRocket } from "react-icons/fa";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import QuizControlButtons from "./QuizControlButtons";
import * as client from "./client";
import "../Assignments/assignments.css";

interface Quiz {
  _id: string;
  course: string;
  title: string;
  published: boolean;
  points?: number;
  dueDate?: string;
  availableDate?: string | null;
  untilDate?: string | null;
  numQuestions?: number;
  score?: number;
}

interface RootState {
  accountReducer: { currentUser: { role?: string } | null };
}

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const canModify =
    currentUser?.role === "ADMIN" ||
    currentUser?.role === "FACULTY" ||
    currentUser?.role === "TA";

  const isStudent = currentUser?.role === "STUDENT";
  const router = useRouter();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [search, setSearch] = useState("");

  const loadQuizzes = async () => {
    if (!cid) return;
    const data = await client.findQuizzesForCourse(cid);
    setQuizzes(data);
  };

  useEffect(() => {
    loadQuizzes();
  }, [cid]);

  const addQuiz = async () => {
    const quiz = await client.createQuiz(cid as string);
    setQuizzes([...quizzes, quiz]);
  };

  const togglePublish = async (quiz: Quiz) => {
    await client.updateQuiz(quiz._id, { published: !quiz.published });
    loadQuizzes();
  };

  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    setQuizzes(quizzes.filter((q) => q._id !== quizId));
  };

  const availabilityStatus = (quiz: Quiz) => {
    const now = new Date();

    if (quiz.availableDate && new Date(quiz.availableDate) > now) {
      return `Not available until ${new Date(
        quiz.availableDate
      ).toLocaleString()}`;
    }

    if (quiz.untilDate && new Date(quiz.untilDate) < now) {
      return "Closed";
    }

    return "Available";
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ maxWidth: 340 }} className="w-100">
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <FaSearch className="text-secondary" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search for Quiz"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-start-0"
            />
          </InputGroup>
        </div>

        {canModify && (
          <div className="ms-3 flex-shrink-0">
            <Button variant="danger" onClick={addQuiz}>
              + Quiz
            </Button>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0 shadow-sm">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="wd-title wd-assn-header px-3 py-3 d-flex justify-content-between align-items-center border-bottom">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5 text-muted" />
              <FaCaretDown className="me-2" />
              <span className="fw-semibold text-uppercase">
                Assignment Quizzes
              </span>
            </span>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {quizzes
              .filter((q) => {
                if (!isStudent) return true; 
                return q.published === true;
              })

              .filter((q) =>
                q.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((q) => (
                <ListGroupItem
                  key={q._id}
                  className="wd-lesson py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0 border-bottom"
                >
                  <div className="d-flex align-items-start w-100">
                    <div className="px-3 pt-1">
                      <BsGripVertical className="me-2 fs-5 text-muted" />
                      <FaRocket
                        className={`me-2 fs-4 ${
                          q.published ? "text-success" : "text-secondary"
                        }`}
                        role="button"
                        onClick={() => !isStudent && togglePublish(q)}
                        title={q.published ? "Published" : "Unpublished"}
                        style={{ cursor: isStudent ? "default" : "pointer" }}
                      />
                    </div>

                    <div className="flex-grow-1">
                      <Link
                        href={`/Courses/${cid}/Quizzes/${q._id}`}
                        className="fw-semibold text-dark text-decoration-none fs-5"
                      >
                        {q.title?.trim() || "(Untitled Quiz)"}
                      </Link>

                      <div className="text-muted small mt-1">
                        {availabilityStatus(q)} <span className="mx-1">|</span>
                        Due:{" "}
                        {q.dueDate ? new Date(q.dueDate).toLocaleString() : "—"}
                        <span className="mx-1">|</span>
                        {q.points || 0} pts <span className="mx-1">|</span>
                        {q.numQuestions || 0} Questions
                        {isStudent && q.score !== undefined && (
                          <>
                            <span className="mx-1">|</span>
                            Score: {q.score}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {canModify && (
                    <QuizControlButtons
                      quizId={q._id}
                      deleteQuiz={removeQuiz}
                      isPublished={q.published}
                      onPublishToggle={() => togglePublish(q)}
                      onEdit={() => {
                        router.push(`/Courses/${cid}/Quizzes/${q._id}/Edit`);
                      }}
                      onCopy={() => alert("Copy feature coming soon!")}
                      onSort={(criteria) => {
                        const sorted = [...quizzes].sort((a, b) => {
                          if (criteria === "title")
                            return a.title.localeCompare(b.title);
                          if (criteria === "dueDate")
                            return (
                              new Date(a.dueDate || 0).getTime() -
                              new Date(b.dueDate || 0).getTime()
                            );
                          if (criteria === "availableDate")
                            return (
                              new Date(a.availableDate || 0).getTime() -
                              new Date(b.availableDate || 0).getTime()
                            );
                          return 0;
                        });
                        setQuizzes(sorted);
                      }}
                    />
                  )}
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
