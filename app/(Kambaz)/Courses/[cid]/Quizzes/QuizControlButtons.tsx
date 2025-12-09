"use client";

import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash, FaCopy, FaCheck, FaTimes, FaPencilAlt } from "react-icons/fa";

export default function QuizControlButtons({
  quizId,
  deleteQuiz,
  onPublishToggle,
  isPublished,
  onEdit,
  onCopy,
  onSort,
}: {
  quizId: string;
  deleteQuiz: (quizId: string) => void;
  onPublishToggle?: () => void;
  isPublished?: boolean;
  onEdit?: () => void;
  onCopy?: () => void;
  onSort?: (criteria: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-flex align-items-center gap-2">

<span
  onClick={onPublishToggle}
  style={{
    display: "inline-flex",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: isPublished ? "#198754" : "#dc3545",
    cursor: "pointer",
  }}
  title={isPublished ? "Unpublish" : "Publish"}
>
  {isPublished ? (
    <FaCheck style={{ color: "white", fontSize: "14px" }} />
  ) : (
    <FaTimes style={{ color: "white", fontSize: "14px" }} />
  )}
</span>


      <Dropdown
        align="end"
        show={open}
        onToggle={(isOpen) => setOpen(isOpen)}
      >
        <Dropdown.Toggle
          as="span"
          className="text-secondary"
          style={{ cursor: "pointer" }}
        >
          <IoEllipsisVertical className="fs-4" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={onEdit}>
            <FaPencilAlt className="me-2" /> Edit
          </Dropdown.Item>

          <Dropdown.Item onClick={onPublishToggle}>
            <FaCheck className="me-2" />
            {isPublished ? "Unpublish" : "Publish"}
          </Dropdown.Item>

          <Dropdown.Item onClick={onCopy}>
            <FaCopy className="me-2" /> Copy
          </Dropdown.Item>

          <Dropdown drop="end">
            <Dropdown.Toggle as="span" className="dropdown-item-text">
              Sort →
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onSort?.("title")}>
                By Name
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onSort?.("dueDate")}>
                By Due Date
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onSort?.("availableDate")}>
                By Available Date
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown.Divider />

          <Dropdown.Item
            className="text-danger"
            onClick={() => deleteQuiz(quizId)}
          >
            <FaTrash className="me-2" /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
