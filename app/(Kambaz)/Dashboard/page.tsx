"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import CardBody from "react-bootstrap/CardBody";
import CardText from "react-bootstrap/CardText";
import CardTitle from "react-bootstrap/CardTitle";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import * as db from "../Database";
import {
  enrollCourse,
  unenrollCourse,
  setUserEnrollments,
} from "../Courses/Enrollments/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const allEnrollments = useSelector(
    (state: any) => state.enrollmentsReducer.userEnrollments
  );
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/newCourse.png",
    description: "New Description",
  });
  const [showAll, setShowAll] = useState(false);

  const isEnrolled = (courseId: string) =>
    allEnrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );

  const toggleEnrollment = (courseId: string) => {
    if (!currentUser?._id) return;
    if (isEnrolled(courseId)) {
      dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
    } else {
      dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
    }
  };

  const visibleCourses = showAll
    ? courses
    : courses.filter((c: any) =>
        allEnrollments.some(
          (e: any) => e.user === currentUser?._id && e.course === c._id
        )
      );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!currentUser?._id) return;
    const key = `enrollments:${currentUser._id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(setUserEnrollments(parsed));
      } catch (err) {}
    }
  }, [currentUser?._id, dispatch]);

  useEffect(() => {
    if (!currentUser?._id) return;
    const mine = allEnrollments.filter(
      (e: any) => e.user === currentUser._id
    );
    localStorage.setItem(`enrollments:${currentUser._id}`, JSON.stringify(mine));
  }, [allEnrollments, currentUser?._id]);

  if (!currentUser?._id) {
    return (
      <div className="p-5 text-danger">
        Please sign in first.
      </div>
    );
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="primary"
          id="wd-enrollments-toggle"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show My Courses" : "Show All Courses"}
        </Button>
      </div>
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card className="position-relative shadow-sm">
                <div
                  className="position-absolute top-0 end-0 m-2"
                  style={{ zIndex: 10 }}
                >
                  {isEnrolled(course._id) ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleEnrollment(course._id);
                      }}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleEnrollment(course._id);
                      }}
                    >
                      Enroll
                    </Button>
                  )}
                </div>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image}
                    width={200}
                    height={150}
                    alt={course.name}
                    className="rounded-top"
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden text-muted"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <Button variant="primary">Go</Button>
                      <div>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger ms-2"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning ms-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
