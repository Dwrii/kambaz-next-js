"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";
import { setCurrentUser } from "../reducer";
import type { User } from "../client";

type ErrorResponse = {
  response?: {
    status?: number;
    data?: { message?: string };
  };
};

export default function Signup() {
  const [user, setUser] = useState<User>({ role: "STUDENT" });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      setError(null);
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (e: unknown) {
      const err = e as ErrorResponse;
      if (err.response?.status === 400) {
        setError(err.response.data?.message ?? "Username already in use");
      } else {
        setError("Unable to signup. Please try again.");
      }
    }
  };

  return (
    <div style={{ padding: "40px 20px 40px 20px", marginLeft: "0px",
      marginTop: "-30px",
    }}>
      <h1
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "20px"
        }}
      >
        Create your Account
      </h1>


      {error && <div className="text-danger mb-3 small">{error}</div>}

      <FormControl
        placeholder="username"
        className="mb-2"
        value={user.username ?? ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        type="password"
        placeholder="password"
        className="mb-2"
        value={user.password ?? ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        placeholder="First Name"
        className="mb-2"
        value={user.firstName ?? ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <FormControl
        placeholder="Last Name"
        className="mb-3"
        value={user.lastName ?? ""}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />

      <select
        className="form-select mb-4"
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </select>

      <Button
        onClick={signup}
        style={{
          width: "200px",
          backgroundColor: "#1565c0",
          border: "none",
          padding: "10px 0",
        }}
      >
        Sign up
      </Button>

      <div className="mt-3">
        Already have an account?{" "}
        <Link href="/Account/Signin">
          Sign in
        </Link>
      </div>
    </div>
  );
}
