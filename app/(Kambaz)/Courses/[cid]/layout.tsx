"use client";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams, redirect } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { userEnrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const [showSidebar, setShowSidebar] = useState(true);

  const course = courses.find((course: any) => course._id === cid);

  useEffect(() => {
    const isEnrolled = userEnrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === cid
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
