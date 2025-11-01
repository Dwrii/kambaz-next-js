"use client";
import { Modal, FormControl, Button, Form } from "react-bootstrap";

export interface Assignment {
  title: string;
  description: string;
  points: number;
  due: string;
  availableFrom: string;
  availableUntil: string;
}

interface Props {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  assignment: Assignment;
  setAssignment: React.Dispatch<React.SetStateAction<Assignment>>;
  addAssignment: () => void;
}

export default function AssignmentChange({
  show,
  handleClose,
  dialogTitle,
  assignment,
  setAssignment,
  addAssignment,
}: Props) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <FormControl
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            placeholder="Enter assignment title"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <FormControl
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            placeholder="Enter description"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <FormControl
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value) || 0,
              })
            }
            placeholder="e.g. 100"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <FormControl
            type="date"
            value={assignment.due}
            onChange={(e) =>
              setAssignment({ ...assignment, due: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <FormControl
            type="date"
            value={assignment.availableFrom}
            onChange={(e) =>
              setAssignment({ ...assignment, availableFrom: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <FormControl
            type="date"
            value={assignment.availableUntil}
            onChange={(e) =>
              setAssignment({ ...assignment, availableUntil: e.target.value })
            }
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            addAssignment();
            handleClose();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
