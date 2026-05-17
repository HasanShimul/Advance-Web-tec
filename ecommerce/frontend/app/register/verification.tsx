"use client";

import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/app/config/api";

type Props = {
  email: string;
};

export default function VerifyEmail({ email }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    return name.slice(0, 3) + "***@" + domain;
  };

  const handleVerify = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await axios.patch(`${API_BASE_URL}/admin/verify/email`, {
        email,
        code,
      });

      setSuccess(true);
    } catch (err: any) {
        if (axios.isAxiosError(err)) {
            console.log("ERROR:", err.response?.data);
        }
     
        setError("Invalid or expired code");
    }
  };

  if (success) {
    return (
      <p className="text-green-500 text-center text-xl">
        Congraculations ! YOu have been successfully registered. Now you can log into the system.
       </p>
    );
  }

  return (
    <form onSubmit={handleVerify} className="flex flex-col gap-4 w-[80%]">
      <p className="text-center text-gray-600">
        A verification code has been sent to <b>{maskEmail(email)}</b>
      </p>

      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="px-4 py-3 border rounded-xl"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button className="bg-blue-600 text-white py-2 rounded-xl">
        Verify Email
      </button>
    </form>
  );
}