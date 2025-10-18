"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";

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

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const assignment = db.assignments.find(
    (a: any) => a.course === cid && a._id === aid
  );

  if (!assignment) {
    return <div className="p-3 text-danger">Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl type="text" defaultValue={assignment.title} />
        </FormGroup>

        <FormGroup className="mb-3" controlId="wd-description">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={6}
            defaultValue={assignment.description}
          />
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-points">
          <FormLabel column sm={2}>Points</FormLabel>
          <Col sm={4}>
            <FormControl type="number" defaultValue={assignment.points} />
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-group">
          <FormLabel column sm={2}>Assignment Group</FormLabel>
          <Col sm={4}>
            <FormSelect defaultValue={assignment.group}>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
              <option value="LABS">LABS</option>
            </FormSelect>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-display-grade-as">
          <FormLabel column sm={2}>Display Grade as</FormLabel>
          <Col sm={4}>
            <FormSelect defaultValue={assignment.displayGradeAs}>
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
              <FormSelect defaultValue={assignment.submissionType}>
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No submission">No submission</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Online Entry Options</FormLabel>
              <div>
                {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map((opt) => (
                  <FormCheck
                    key={opt}
                    type="checkbox"
                    label={opt}
                    defaultChecked={assignment.onlineEntryOptions?.includes(opt)}
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
              <FormControl type="text" defaultValue={assignment.assignTo} />
            </FormGroup>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-due-date">
                  <FormLabel>Due</FormLabel>
                  <FormControl type="date" defaultValue={assignment.due} />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-available-from">
                  <FormLabel>Available from</FormLabel>
                  <FormControl type="date" defaultValue={assignment.availableFrom} />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup controlId="wd-available-until">
                  <FormLabel>Until</FormLabel>
                  <FormControl type="date" defaultValue={assignment.availableUntil} />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <div className="mt-4">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
