"use client";

import { BsGripVertical, BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import { LiaBookSolid } from "react-icons/lia";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Link from "next/link";
import AssignmentControlButtons from "./AssignmentControlButtons";
import "./assignments.css";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ maxWidth: 340 }} className="w-100">
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <FaSearch className="text-secondary" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search..."
              id="wd-search-assignments"
              className="border-start-0"
            />
          </InputGroup>
        </div>
        <div className="ms-3 flex-shrink-0">
          <Button variant="secondary" className="me-2 group-btn" id="wd-add-group">
            + Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            + Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0 shadow-sm">
        <ListGroup.Item className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="wd-title wd-assn-header px-3 py-3 d-flex justify-content-between align-items-center border-bottom bg-light">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5 text-muted" />
              <FaCaretDown className="me-2" />
              <span className="fw-semibold text-uppercase">Assignments</span>
            </span>
            <div className="d-flex align-items-center">
              <span className="wd-weight-pill me-2">40% of Total</span>
              <BsPlus className="fs-4 me-2 text-secondary" />
              <BsThreeDotsVertical className="fs-5 text-secondary" />
            </div>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson wd-left-accent py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0 border-bottom">
              <div className="d-flex align-items-start w-100">
                <div className="px-3 pt-1">
                  <BsGripVertical className="me-2 fs-5 text-muted" />
                  <LiaBookSolid className="me-2 fs-4 text-success" />
                </div>
                <div className="flex-grow-1">
                  <Link
                    href="/Courses/1234/Assignments/a1"
                    className="fw-semibold text-dark text-decoration-none fs-5"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2 text-muted">|</span>
                    <b>Not available until</b> May 6 at 12:00am |
                  </div>
                  <div className="text-muted small">
                    <b>Due</b> May 13 at 11:59pm
                    <span className="mx-2 text-muted">|</span>
                    100 pts
                  </div>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson wd-left-accent py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0 border-bottom">
              <div className="d-flex align-items-start w-100">
                <div className="px-3 pt-1">
                  <BsGripVertical className="me-2 fs-5 text-muted" />
                  <LiaBookSolid className="me-2 fs-4 text-success" />
                </div>
                <div className="flex-grow-1">
                  <Link
                    href="/Courses/1234/Assignments/a2"
                    className="fw-semibold text-dark text-decoration-none fs-5"
                  >
                    A2 - CSS + Bootstrap
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2 text-muted">|</span>
                    <b>Not available until</b> May 13 at 12:00am |
                  </div>
                  <div className="text-muted small">
                    <b>Due</b> May 20 at 11:59pm
                    <span className="mx-2 text-muted">|</span>
                    100 pts
                  </div>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson wd-left-accent py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0">
              <div className="d-flex align-items-start w-100">
                <div className="px-3 pt-1">
                  <BsGripVertical className="me-2 fs-5 text-muted" />
                  <LiaBookSolid className="me-2 fs-4 text-success" />
                </div>
                <div className="flex-grow-1">
                  <Link
                    href="/Courses/1234/Assignments/a3"
                    className="fw-semibold text-dark text-decoration-none fs-5"
                  >
                    A3 - JavaScript + React
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2 text-muted">|</span>
                    <b>Not available until</b> May 20 at 12:00am |
                  </div>
                  <div className="text-muted small">
                    <b>Due</b> May 27 at 11:59pm
                    <span className="mx-2 text-muted">|</span>
                    100 pts
                  </div>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
