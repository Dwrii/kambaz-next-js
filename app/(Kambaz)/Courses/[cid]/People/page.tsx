"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { findUsersForCourse } from "../../client";
import PeopleTable from "./Table";
import type { User } from "../../../type";

export default function PeopleInCoursePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const data = await findUsersForCourse(cid as string);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div className="container mt-3">
      <h2>People enrolled in this course</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
