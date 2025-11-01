"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";
import FormSelect from "react-bootstrap/FormSelect";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import Button from "react-bootstrap/Button";

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

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ 指定 Redux state 类型
  const { assignments } = useSelector(
    (state: { assignmentsReducer: { assignments: Assignment[] } }) =>
      state.assignmentsReducer
  );

  const isNew = aid === "new";

  // ✅ 指定 find() 内类型
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
      : { ...(original || ({} as Assignment)) }
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
        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl
            type="text"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="wd-description">
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

        <FormGroup as={Row} className="mb-3" controlId="wd-points">
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

        <FormGroup as={Row} className="mb-3" controlId="wd-group">
          <FormLabel column sm={2}>
            Assignment Group
          </FormLabel>
          <Col sm={4}>
            <FormSelect
              value={assignment.group}
              onChange={(e) =>
                setAssignment({ ...assignment, group: e.target.value })
              }
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
              <option value="LABS">LABS</option>
            </FormSelect>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-display-grade-as">
          <FormLabel column sm={2}>
            Display Grade as
          </FormLabel>
          <Col sm={4}>
            <FormSelect
              value={assignment.displayGradeAs}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  displayGradeAs: e.target.value,
                })
              }
            >
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Letter Grade">Letter Grade</option>
              <option value="GPA">GPA</option>
            </FormSelect>
          </Col>
        </FormGroup>

        <Card className="mb-3">
          <CardBody>
            <FormGroup className="mb-3" controlId="wd-submission-type">
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

            <FormGroup>
              <FormLabel>Online Entry Options</FormLabel>
              <div>
                {[
                  "Text Entry",
                  "Website URL",
                  "Media Recordings",
                  "Student Annotation",
                  "File Uploads",
                ].map((opt) => (
                  <FormCheck
                    key={opt}
                    type="checkbox"
                    label={opt}
                    checked={
                      assignment.onlineEntryOptions?.includes(opt) || false
                    }
                    onChange={() => handleCheckbox(opt)}
                  />
                ))}
              </div>
            </FormGroup>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardBody>
            <FormGroup className="mb-3">
              <FormLabel>Assign to</FormLabel>
              <FormControl
                type="text"
                value={assignment.assignTo}
                onChange={(e) =>
                  setAssignment({ ...assignment, assignTo: e.target.value })
                }
              />
            </FormGroup>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-due-date">
                  <FormLabel>Due</FormLabel>
                  <FormControl
                    type="date"
                    value={assignment.due || ""}
                    onChange={(e) =>
                      setAssignment({ ...assignment, due: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-available-from">
                  <FormLabel>Available from</FormLabel>
                  <FormControl
                    type="date"
                    value={assignment.availableFrom || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFrom: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup controlId="wd-available-until">
                  <FormLabel>Until</FormLabel>
                  <FormControl
                    type="date"
                    value={assignment.availableUntil || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntil: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <div className="mt-4">
          <Link
            href={`/Courses/${cid}/Assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
