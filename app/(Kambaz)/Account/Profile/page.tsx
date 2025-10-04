"use client";
import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="pe-3">
      <h1>Profile</h1>
      <FormControl
        id="wd-profile-username"
        placeholder="username"
        defaultValue="wurui2"
        className="mb-2"
      />
      <FormControl
        id="wd-profile-password"
        type="password"
        placeholder="password"
        defaultValue="123"
        className="mb-2"
      />
      <FormControl
        id="wd-profile-first"
        placeholder="First Name"
        defaultValue="Rui"
        className="mb-2"
      />
      <FormControl
        id="wd-profile-last"
        placeholder="Last Name"
        defaultValue="Wu"
        className="mb-2"
      />
      <FormControl
        id="wd-dob"
        type="date"
        defaultValue="2000-09-012"
        className="mb-2"
      />
      <FormControl
        id="wd-email"
        type="email"
        placeholder="email"
        defaultValue="wu.rui2@northeastern.edu"
        className="mb-2"
      />
      <select id="wd-role" defaultValue="STUDENT" className="form-select mb-3">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link
        id="wd-signout-btn"
        href="/Account/Signin"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}
