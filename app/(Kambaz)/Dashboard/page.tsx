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
import { setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import { enrollCourse, unenrollCourse } from "../Courses/Enrollments/reducer";
import * as enrollmentClient from "../Courses/Enrollments/client";
import { setUserEnrollments } from "../Courses/Enrollments/reducer";


export interface Course {
  _id: string;
  name: string;
  number: string;
  description: string;
  image?: string;
}

export interface Enrollment {
  user: string;
  course: string;
}

export interface User {
  _id: string;
  username: string;
  role?: string;
}

interface RootState {
  coursesReducer: { courses: Course[] };
  accountReducer: { currentUser: User | null };
  enrollmentsReducer: { userEnrollments: Enrollment[] };
}

function DashboardBody() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const allEnrollments = useSelector(
    (state: RootState) => state.enrollmentsReducer.userEnrollments
  );

  const isAdmin = currentUser?.role === "ADMIN";
  const isFaculty = currentUser?.role === "FACULTY";
  const canModify = isAdmin || isFaculty;

  const [course, setCourse] = useState<Course>({
    _id: "New Course",
    name: "New Course",
    number: "New Number",
    description: "New Description",
    image: "/images/newCourse.png",
  });

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      if (!currentUser?._id) return;
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    };
    loadCourses();
  }, [currentUser, dispatch]);

  useEffect(() => {
  const loadEnrollments = async () => {
    if (!currentUser?._id) return;

    const mine = await enrollmentClient.getUserEnrollments(currentUser._id);
    dispatch(setUserEnrollments(mine));
  };
  loadEnrollments();
}, [currentUser, dispatch]);

  const isEnrolled = (courseId: string): boolean =>
    allEnrollments.some(
      (e: Enrollment) => e.user === currentUser?._id && e.course === courseId
    );

const toggleEnrollment = async (courseId: string) => {
  if (!currentUser?._id) return;

  if (isEnrolled(courseId)) {
    await enrollmentClient.unenroll(currentUser._id, courseId);
    dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
  } else {
    await enrollmentClient.enroll(currentUser._id, courseId);
    dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
  }
};

  const visibleCourses = showAll
    ? courses
    : courses.filter((c: Course) =>
        allEnrollments.some(
          (e: Enrollment) =>
            e.user === currentUser?._id && e.course === c._id
        )
      );

const onAddNewCourse = async () => {
  const newCourse = { ...course, _id: course.name };
  const created = await client.createCourse(newCourse);
  dispatch(setCourses([...courses, created]));
};

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

const onUpdateCourse = async () => {
  const updated = { ...course };

  await client.updateCourse(updated);
  dispatch(
    setCourses(
      courses.map((c) => (c._id === updated._id ? updated : c))
    )
  );
};


  if (!currentUser?._id) {
    return <div className="p-5 text-danger">Please sign in first.</div>;
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {canModify && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
            >
              Update
            </button>
          </h5>

          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => {
              const name = e.target.value;
              setCourse({ ...course, name, _id: name });
            }}
          />
          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />

          <hr />
        </>
      )}

      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="primary"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show My Courses" : "Show All Courses"}
        </Button>
      </div>

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course) => (
            <Col key={course._id} style={{ width: "300px" }}>
              <Card className="position-relative shadow-sm">
                <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
                  {isEnrolled(course._id) ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
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
                        toggleEnrollment(course._id);
                      }}
                    >
                      Enroll
                    </Button>
                  )}
                </div>

                <Link href={`/Courses/${course._id}/Home`} className="text-decoration-none text-dark">
                  <CardImg
                    variant="top"
                    src={course.image}
                    width={200}
                    height={150}
                  />

                  <CardBody>
                    <CardTitle className="text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>

                    <CardText
                      className="overflow-hidden text-muted"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <Button variant="primary">Go</Button>

                      <div>
                        {canModify && (
                          <>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={(e) => {
                                e.preventDefault();
                                onDeleteCourse(course._id);
                              }}
                            >
                              Delete
                            </button>

                            <button
                              className="btn btn-warning ms-2"
                              onClick={(e) => {
                                e.preventDefault();
                                setCourse(course);
                              }}
                            >
                              Edit
                            </button>
                          </>
                        )}
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

export default function Dashboard() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;
  return <DashboardBody />;
}
