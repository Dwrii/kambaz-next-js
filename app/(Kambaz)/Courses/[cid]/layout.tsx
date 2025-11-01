"use client";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams, redirect } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { Course } from "../reducer";

interface Enrollment {
  user: string;
  course: string;
}

interface RootState {
  coursesReducer: { courses: Course[] };
  accountReducer: { currentUser: { _id: string } | null };
  enrollmentsReducer: { userEnrollments: Enrollment[] };
}

export default function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { cid } = useParams<{ cid: string }>();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { userEnrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const [showSidebar, setShowSidebar] = useState(true);

  const course = courses.find((c) => c._id === cid);

  useEffect(() => {
    const isEnrolled = userEnrollments.some(
      (e) => e.user === currentUser?._id && e.course === cid
    );
    if (!isEnrolled) {
      redirect("/Dashboard");
    }
  }, [cid, currentUser, userEnrollments]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-3 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        {course?.name}
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {showSidebar && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
