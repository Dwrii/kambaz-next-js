"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();

  const rawSection = pathname.split("/").filter(Boolean).pop() || "";

  const isMongoId = /^[0-9a-fA-F]{24}$/.test(rawSection);

  let section = rawSection;
  if (isMongoId) {
    section = "Quiz";
  } else {
    section = rawSection.charAt(0).toUpperCase() + rawSection.slice(1);
  }

  return (
    <span className="ms-1 text-danger fw-normal">
      {course?.name} <span className="text-danger">&gt;</span> {section}
    </span>
  );
}
