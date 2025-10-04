"use client";

import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";
import FormSelect from "react-bootstrap/FormSelect";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody"

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl type="text" defaultValue="A1" />
        </FormGroup>

        <FormGroup className="mb-3" controlId="wd-description">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={6}
            defaultValue={`The assignment is available online Submit a link to the landing page of your Web application ..... `}
          />
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-points">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={4}>
            <FormControl type="number" defaultValue={100} />
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-group">
          <FormLabel column sm={2}>Assignment Group</FormLabel>
          <Col sm={4}>
            <FormSelect defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-display-grade-as">
          <FormLabel column sm={2}>Display Grade as</FormLabel>
          <Col sm={4}>
            <FormSelect defaultValue="Percentage">
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
              <FormSelect defaultValue="Online">
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No submission">No submission</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Online Entry Options</FormLabel>
              <div>
                <FormCheck type="checkbox" label="Text Entry" />
                <FormCheck type="checkbox" label="Website URL" defaultChecked />
                <FormCheck type="checkbox" label="Media Recordings" />
                <FormCheck type="checkbox" label="Student Annotation" />
                <FormCheck type="checkbox" label="File Uploads" />
              </div>
            </FormGroup>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardBody>
            <FormGroup className="mb-3">
              <FormLabel>Assign to</FormLabel>
              <FormControl type="text" defaultValue="Everyone" />
            </FormGroup>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-due-date">
                  <FormLabel>Due</FormLabel>
                  <FormControl type="date" defaultValue="2024-05-13" />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-available-from">
                  <FormLabel>Available from</FormLabel>
                  <FormControl type="date" defaultValue="2024-05-06" />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup controlId="wd-available-until">
                  <FormLabel>Until</FormLabel>
                  <FormControl type="date" defaultValue="2024-05-20" />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <div className="mt-4">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
