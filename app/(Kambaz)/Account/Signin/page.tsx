"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

type Credentials = {
  username: string;
  password: string;
};

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignin = async () => {
    setError("");
    try {
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid username or password.");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (_err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div style={{ padding: "40px 20px 40px 20px", marginLeft: "0px",
      marginTop: "-30px",
    }}>

      {/* Title */}
      <h1
        className="mb-4"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Northeastern University
      </h1>

      {error && (
        <div className="text-danger mb-3 small">{error}</div>
      )}

      {/* Username */}
      <label className="fw-semibold mt-3">
        myNortheastern Username
      </label>
      <FormControl
        id="wd-username"
        className="mb-3"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      {/* Password */}
      <label className="fw-semibold">
        myNortheastern Password
      </label>
      <FormControl
        id="wd-password"
        className="mb-4"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      {/* Login button */}
      <Button
        onClick={handleSignin}
        className="mb-2"
        style={{
          width: "200px",
          backgroundColor: "#c62828",
          border: "none",
          padding: "10px 0",
        }}
      >
        Log In
      </Button>

      <div className="mt-3">
        Need an account?{" "}
        <Link href="/Account/Signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
