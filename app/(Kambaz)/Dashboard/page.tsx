"use client";

import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setCourses } from "../Courses/reducer";
import type { Course } from "../Courses/reducer";
import {
  enrollCourse,
  unenrollCourse,
  clearEnrollments,
  setUserEnrollments,
  type Enrollment,
} from "../Courses/Enrollments/reducer";
import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "../Courses/Enrollments/client";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses } = useSelector((s: RootState) => s.coursesReducer);

  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  ) as { _id: string; role?: string } | null;

  const role = currentUser?.role;
  const isFaculty = role === "FACULTY" || role === "ADMIN";
  const isStudent = role === "STUDENT" || role === "USER";

  const userEnrollments = useSelector(
    (s: RootState) => s.enrollmentsReducer.userEnrollments
  ) as Enrollment[];

  const userId = currentUser?._id ?? null;
  const [enrolling, setEnrolling] = useState(false);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/newCourse.png",
    description: "New Description",
  });

  const startEdit = (c: Course) => setCourse({ ...c });

  const isEnrolled = (courseId: string) =>
    !!(
      userId &&
      userEnrollments.some(
        (en) => en.user === userId && en.course === courseId
      )
    );

  const visibleCourses = useMemo(() => {
    if (!userId) return [];

    if (isStudent) {
      return enrolling ? courses : courses.filter((c) => isEnrolled(c._id));
    }

    if (isFaculty) {
      return courses.filter(
        (c) => !c.owner || c.owner === userId
      );
    }

    return courses;
  }, [enrolling, courses, userEnrollments, userId, isStudent, isFaculty]);

  const fetchData = async () => {
    if (!currentUser) {
      dispatch(setCourses([]));
      dispatch(clearEnrollments());
      return;
    }

    try {
      const [allCourses, myEnrollments] = await Promise.all([
        coursesClient.fetchAllCourses(),
        enrollmentsClient.getUserEnrollments(currentUser._id),
      ]);

      dispatch(setCourses(allCourses));

      const normalizedEnrollments = (myEnrollments ?? []).map(
        (e: Enrollment) => ({
          user: e.user,
          course: e.course,
        })
      );

      dispatch(setUserEnrollments(normalizedEnrollments));
    } catch (e) {
      console.error("Failed to load dashboard data:", e);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?._id]);

  const resetCourseForm = () => {
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/newCourse.png",
      description: "New Description",
    });
  };

  const onAddNewCourse = async () => {
    if (!currentUser || !isFaculty) return;

    try {
      const newCourse = await coursesClient.createCourse({
        name: course.name,
        number: course.number,
        description: course.description,
        image: course.image,
      });

      dispatch(setCourses([...courses, newCourse]));

      resetCourseForm();
    } catch (e) {
      console.error("Failed to add new course:", e);
    }
  };

  const onUpdateCourse = async () => {
    if (!course._id || !currentUser || !isFaculty) return;
    try {
      const originalId = course._id;
      const updated = await coursesClient.updateCourse(course);

      dispatch(
        setCourses(
          courses.map((c) => (c._id === originalId ? updated : c))
        )
      );

      resetCourseForm();
    } catch (e) {
      console.error(e);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    if (!currentUser || !isFaculty) return;
    try {
      await coursesClient.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleEnroll = async (courseId: string) => {
    if (!userId || !isStudent) return;
    try {
      if (isEnrolled(courseId)) {
        await enrollmentsClient.unenroll(userId, courseId);
        dispatch(unenrollCourse({ user: userId, course: courseId }));
      } else {
        await enrollmentsClient.enroll(userId, courseId);
        dispatch(enrollCourse({ user: userId, course: courseId }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const canToggleEnroll = !!currentUser && isStudent;

  return (
    <div id="wd-dashboard" className="p-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title" className="mb-0">
          Dashboard
        </h1>

        {currentUser && isStudent && (
          <Button
            id="wd-enrollments-toggle"
            variant="primary"
            onClick={() => setEnrolling((v) => !v)}
            aria-pressed={enrolling}
          >
            {enrolling ? "My Courses" : "All Courses"}
          </Button>
        )}
      </div>

      <hr />
      {currentUser && isFaculty && (
        <>
          <h5 className="mb-2">
            New Course
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </Button>
            <Button
              className="btn btn.warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </Button>
          </h5>

          <FormControl
            className="mb-2"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course name"
            aria-label="Course name"
          />
          <FormControl
            className="mb-2"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            as="textarea"
            rows={3}
            placeholder="Course description"
            aria-label="Course description"
          />
          <hr />
        </>
      )}

      {!currentUser ? (
        <>
          <h2 id="wd-dashboard-please-sign" className="text-danger">
            Please sign in to view your courses
          </h2>
          <hr />
        </>
      ) : (
        <>
          <h2 id="wd-dashboard-published" className="d-flex align-items-center">
            {isStudent
              ? enrolling
                ? `All Courses (${visibleCourses.length})`
                : `My Courses (${visibleCourses.length})`
              : `All Courses (${visibleCourses.length})`}
          </h2>
          <hr />
        </>
      )}

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c) => {
            const enrolled = isEnrolled(c._id);
            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card className="position-relative">
                  {enrolling && canToggleEnroll && (
                    <Button
                      size="sm"
                      variant={enrolled ? "danger" : "success"}
                      className="position-absolute top-0 start-0 m-2 px-3 py-1"
                      id={
                        enrolled
                          ? `wd-unenroll-course-click-${c._id}`
                          : `wd-enroll-course-click-${c._id}`
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleEnroll(c._id);
                      }}
                    >
                      {enrolled ? "Unenroll" : "Enroll"}
                    </Button>
                  )}

                  <Link
                    href={`/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src={c.image || "/images/newCourse.png"}
                      width="100%"
                      height={160}
                      alt={c.name}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <Button variant="primary" className="px-3">
                          Go
                        </Button>

                        {isFaculty && (
                          <div className="d-flex gap-2">
                            <Button
                              id={`wd-edit-course-click-${c._id}`}
                              className="btn btn-warning px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                startEdit(c);
                              }}
                            >
                              Edit
                            </Button>
                              <Button
                              id={`wd-delete-course-click-${c._id}`}
                              className="btn btn-danger px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                onDeleteCourse(c._id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
