"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import { LiaBookSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentChange from "./AssignmentChange";
import {
  setAssignments,
  deleteAssignment,
} from "./reducer";
import * as client from "./client";
import "./assignments.css";

interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

interface RootState {
  assignmentsReducer: { assignments: Assignment[] };
}

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  interface RootState {
  accountReducer: { currentUser: { role?: string } | null };
  assignmentsReducer: { assignments: Assignment[] };
}

const { currentUser } = useSelector(
  (state: RootState) => state.accountReducer
);

  const isAdmin = currentUser?.role === "ADMIN";
  const isFaculty = currentUser?.role === "FACULTY";
  const canModify = isAdmin || isFaculty;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [assignment, setAssignment] = useState<Assignment>({
    _id: "",
    course: cid ?? "",
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState<Assignment | null>(null);

  const fetchAssignments = async () => {
    if (!cid) return;
    const data = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(data));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const onCreateAssignment = async () => {
    if (!cid) return;
    const newAssignment = {
      title: assignment.title,
      description: assignment.description,
      points: assignment.points,
      dueDate: assignment.dueDate,
      availableFrom: assignment.availableFrom,
      availableUntil: assignment.availableUntil,
    };
    const created = await client.createAssignmentForCourse(
      cid as string,
      newAssignment
    );
    dispatch(setAssignments([...assignments, created]));
    setAssignment({
      _id: "",
      course: cid,
      title: "",
      description: "",
      points: 100,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
    });
    setShow(false);
  };

  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

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

        {canModify && (
          <div className="ms-3 flex-shrink-0">
            <Button variant="secondary" className="me-2 group-btn">
              + Group
            </Button>
            <Button
              variant="danger"
              onClick={() => setShow(true)}
            >
              + Assignment
            </Button>
          </div>
        )}
      </div>

      <AssignmentChange
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Assignment"
        assignment={assignment}
        setAssignment={setAssignment}
        addAssignment={onCreateAssignment}
      />

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{toDelete?.title}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (toDelete?._id) {
                onRemoveAssignment(toDelete._id);
              }
              setShowDelete(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ListGroup className="rounded-0 shadow-sm">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="wd-title wd-assn-header px-3 py-3 d-flex justify-content-between align-items-center border-bottom">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5 text-muted" />
              <FaCaretDown className="me-2" />
              <span className="fw-semibold text-uppercase">Assignments</span>
            </span>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((a) => a.course === cid)
              .map((a) => (
                <ListGroupItem
                  key={a._id}
                  className="wd-lesson py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0 border-bottom"
                >
                  <div className="d-flex align-items-start w-100">
                    <div className="px-3 pt-1">
                      <BsGripVertical className="me-2 fs-5 text-muted" />
                      <LiaBookSolid className="me-2 fs-4 text-success" />
                    </div>

                    <div className="flex-grow-1">
                      <Link
                        href={`/Courses/${cid}/Assignments/${a._id}`}
                        className="fw-semibold text-dark text-decoration-none fs-5"
                      >
                        {a.title?.trim() || "(Untitled)"}
                      </Link>

                      {a.description && (
                        <div className="text-muted small mt-1">
                          {a.description}
                        </div>
                      )}

                      <div className="text-muted small mt-1">
                        {a.availableFrom && (
                          <>
                            <b>Available From:</b> {a.availableFrom} <span className="mx-1">|</span>
                          </>
                        )}
                        {a.availableUntil && (
                          <>
                            <b>Until:</b> {a.availableUntil} <span className="mx-1">|</span>
                          </>
                        )}
                        <b>Due:</b> {a.dueDate || "—"} <span className="mx-1">|</span>
                        {a.points} pts
                      </div>
                    </div>
                  </div>

                  {canModify && (
                    <AssignmentControlButtons
                      assignmentId={a._id}
                      deleteAssignment={() => {
                        setToDelete(a);
                        setShowDelete(true);
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
