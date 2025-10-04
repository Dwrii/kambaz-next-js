"use client";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch, FaPlus } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import AssignmentItem from "./AssignmentItem";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center" style={{ maxWidth: "300px" }}>
          <FaSearch className="me-2 text-secondary fs-5" />
          <FormControl
            type="text"
            placeholder="Search..."
            id="wd-search-assignments"
            className="fs-6"
          />
        </div>
        <div>
          <Button variant="secondary" className="me-2 fs-6" id="wd-add-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" className="fs-6" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <div className="bg-secondary text-dark p-3 d-flex justify-content-between align-items-center fs-5">
        <span>
          <BsGripVertical className="me-2 fs-4" />
          ASSIGNMENTS
        </span>
        <span className="badge bg-light text-dark border">40% of Total</span>
      </div>

      <div className="fs-6">
        <AssignmentItem
          title="A1 - ENV + HTML"
          href="/Courses/1234/Assignments/a1"
          details='
            <span class="text-danger">Multiple Modules</span> | 
            <b>Not available until</b> May 6 at 12:00am | 
            <b>Due</b> May 13 at 11:59pm | 100 pts'
        />
        <AssignmentItem
          title="A2 - CSS + Bootstrap"
          href="/Courses/1234/Assignments/a2"
          details='
            <span class="text-danger">Multiple Modules</span> | 
            <b>Not available until</b> May 13 at 12:00am | 
            <b>Due</b> May 20 at 11:59pm | 100 pts'
        />
        <AssignmentItem
          title="A3 - JavaScript + React"
          href="/Courses/1234/Assignments/a3"
          details='
            <span class="text-danger">Multiple Modules</span> | 
            <b>Not available until</b> May 20 at 12:00am | 
            <b>Due</b> May 27 at 11:59pm | 100 pts'
        />
      </div>
    </div>
  );
}
