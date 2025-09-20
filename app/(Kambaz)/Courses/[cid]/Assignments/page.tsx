import Link from "next/link";
export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <p className="wd-assignment-instructions">
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |
            <b>Due</b> May 13 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOSTSTRAP
          </Link>
          <p className="wd-assignment-instructions">
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |
            <b>Due</b> May 20 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <p className="wd-assignment-instructions">
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |
            <b>Due</b> May 27 at 11:59pm | 100 pts
          </p>
        </li>
      </ul>
      <h3 id="wd-quizzes-title">
        QUIZZES 10% of Total <button>+</button>
      </h3>
      <ul id="wd-quiz-list">
        <li className="wd-quiz-list-item">
          <Link
            href="/Courses/4550/Assignments/q1"
            className="wd-assignment-link"
          >
            Q1 - HTML Basics
          </Link>
          <div>
            <b>Not available until</b> May 12 at 12:00am | <b>Due</b> May 13 at
            11:59pm | 20 pts
          </div>
        </li>
      </ul>
      <h3 id="wd-exams-title">
        EXAMS 30% of Total <button>+</button>
      </h3>
      <ul id="wd-exam-list">
        <li className="wd-exam-list-item">
          <Link
            href="/Courses/4550/Assignments/exam1"
            className="wd-assignment-link"
          >
            Exam
          </Link>
          <div>
            <b>Not available until</b> Sep 25 at 12:00am | <b>Due</b> Sep 25 at
            11:59pm | 100 pts
          </div>
        </li>
      </ul>

      <h3 id="wd-project-title">
        PROJECT 20% of Total <button>+</button>
      </h3>
      <ul id="wd-project-list">
        <li className="wd-project-list-item">
          <Link
            href="/Courses/4550/Assignments/final"
            className="wd-assignment-link"
          >
            Final Project
          </Link>
          <div>
            Group project | <b>Not available until</b> May 6 at 12:00am |
            <b>Due</b> Jun 12 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}