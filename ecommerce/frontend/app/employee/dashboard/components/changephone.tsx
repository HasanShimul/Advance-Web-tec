'use client';

import axios from "axios";
import { useState } from "react";
import API_BASE_URL from "@/app/config/api";

export default function ChangePhone() {

    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const changePhone = async () => {

        try {

            setLoading(true);

            setError("");
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `${API_BASE_URL}/users/employee/change/phone`,
                {
                    phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);

            setPhone("");

        } catch (err: any) {

            if (err.response) {

                setError(
                    err.response.data.message ||
                    "Something went wrong"
                );

            } else {

                setError("Server is not responding");
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-4">
                Change Phone Number
            </h2>

            <input
                type="text"
                placeholder="New phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border p-3 rounded-xl"
            />

            <button
                onClick={changePhone}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl mt-4"
            >
                {loading ? "Updating..." : "Change Phone"}
            </button>

            {message && (
                <p className="text-green-500 mt-3">
                    {message}
                </p>
            )}

            {error && (
                <p className="text-red-500 mt-3">
                    {error}
                </p>
            )}

        </div>
    );
}