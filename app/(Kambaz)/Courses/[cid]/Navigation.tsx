"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { courses } from "../../Database";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams(); 

  const course = courses.find((course) => course._id === cid);

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const href = `/Courses/${cid}/${label}`;
        const active = pathname.endsWith(label);

        return (
          <Link
            key={label}
            href={href}
            id={`wd-course-${label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              active ? "active text-black" : "text-danger"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
