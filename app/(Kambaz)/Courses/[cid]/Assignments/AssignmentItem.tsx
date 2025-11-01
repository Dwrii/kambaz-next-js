import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useState } from "react";

interface AssignmentItemProps {
  title: string;
  href: string;
  details: string;
  _id: string;
}

interface ToDelete {
  _id: string;
  title: string;
}

export default function AssignmentItem({
  title,
  href,
  details,
  _id,
}: AssignmentItemProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState<ToDelete | null>(null);

  return (
    <div className="d-flex align-items-start border-bottom py-2 small">
      <BsGripVertical className="me-2 fs-5 text-secondary mt-1" />
      <div className="flex-grow-1">
        <div className="d-flex align-items-center mb-1">
          <FaRegFileAlt className="me-2 text-success fs-5" />
          <Link href={href} className="fs-5 fw-semibold text-decoration-none text-primary">
            {title}
          </Link>
        </div>
        <div className="ms-4 text-muted">
          {details ? (
            <span>{details}</span>
          ) : (
            <>
              <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
            </>
          )}
        </div>
      </div>
      <div className="ms-2">
        <AssignmentControlButtons
          assignmentId={_id}
          deleteAssignment={() => {
            setToDelete({ _id, title });
            setShowDelete(true);
          }}
        />
      </div>
    </div>
  );
}
