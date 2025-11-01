"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  FormSelect,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  group: string;
  displayGradeAs: string;
  submissionType: string;
  onlineEntryOptions?: string[];
  assignTo?: string;
  due?: string;
  availableFrom?: string;
  availableUntil?: string;
}

interface RootState {
  assignmentsReducer: { assignments: Assignment[] };
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const isNew = aid === "new";
  const original = assignments.find(
    (a: Assignment) => a.course === cid && a._id === aid
  );

  const [assignment, setAssignment] = useState<Assignment>(
    isNew
      ? {
          _id: "",
          course: cid,
          title: "",
          description: "",
          points: 100,
          group: "ASSIGNMENTS",
          displayGradeAs: "Points",
          submissionType: "Online",
          onlineEntryOptions: [],
          assignTo: "",
          due: "",
          availableFrom: "",
          availableUntil: "",
        }
      : (original as Assignment)
  );

  useEffect(() => {
    if (!isNew && !original) {
      router.push(`/Courses/${cid}/Assignments`);
    }
  }, [isNew, original, cid, router]);

  const handleCheckbox = (option: string) => {
    const current = assignment.onlineEntryOptions || [];
    setAssignment({
      ...assignment,
      onlineEntryOptions: current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option],
    });
  };

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment({ ...assignment, course: cid }));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <FormGroup className="mb-3">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl
            type="text"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={6}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={4}>
            <FormControl
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value),
                })
              }
            />
          </Col>
        </FormGroup>

        <Card className="mb-3">
          <Card.Body>
            <FormGroup>
              <FormLabel>Submission Type</FormLabel>
              <FormSelect
                value={assignment.submissionType}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    submissionType: e.target.value,
                  })
                }
              >
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No submission">No submission</option>
              </FormSelect>
            </FormGroup>

            <FormGroup className="mt-3">
              <FormLabel>Online Entry Options</FormLabel>
              {["Text Entry", "Website URL", "File Uploads"].map((opt) => (
                <FormCheck
                  key={opt}
                  label={opt}
                  type="checkbox"
                  checked={
                    assignment.onlineEntryOptions?.includes(opt) || false
                  }
                  onChange={() => handleCheckbox(opt)}
                />
              ))}
            </FormGroup>
          </Card.Body>
        </Card>

        <div className="mt-4">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => router.push(`/Courses/${cid}/Assignments`)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
