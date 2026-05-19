'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "@/app/config/api";


export default function EmployeeList() {

    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchEmployees = async () => {

            try {

                const response = await axios.get(
                    `${API_BASE_URL}/users/employee/findall`
                );

                setEmployees(response.data);

            } catch (err: any) {

                setError("Failed to get employees");

            } finally {

                setLoading(false);
            }
        };

        fetchEmployees();

    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-4">
                All Employees
            </h2>

            {loading && <p>Loading...</p>}

            {error && (
                <p className="text-red-500">
                    {error}
                </p>
            )}

            <div className="space-y-4">

                {employees.map((employee, index) => (

                    <div
                        key={index}
                        className="border rounded-xl p-4"
                    >

                        <h2 className="font-bold">{employee.id}</h2>
                        <h3 className="font-bold">
                            {employee.fullname}
                        </h3>

                        <p>{employee.email}</p>

                        <p>{employee.phone}</p>

                        <p className="text-sm text-gray-500">
                            {employee.position}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}