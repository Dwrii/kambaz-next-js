"use client";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch, FaPlus } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import AssignmentItem from "./AssignmentItem";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

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
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <AssignmentItem
              key={assignment._id}
              title={assignment.title}
              href={`/Courses/${cid}/Assignments/${assignment._id}`}
              details={assignment.details}
            />
          ))}
      </div>
    </div>
  );
}
