"use client";
import React from "react";
import { usePathname } from "next/navigation";


export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
    const pathname = usePathname();
    const section = pathname.split("/").pop();
  
    return (
      <span className="ms-1 text-danger fw-normal">
        {course?.name} <span className="text-danger">&gt;</span> {section}
      </span>
    );
}
