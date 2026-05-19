import { useState } from "react";
import axios from "axios";
import { email, z } from "zod";
import API_BASE_URL from "@/app/config/api";

export default function EmployeeRegister() {


    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const employeSchema = z.object({
        fullname: z.string().min(1, "Name is required"),
        email: z.string().email("email is invalid"),
        phone: z.string().min(11, "Phone number should be 11 digit"),
        password: z.string().min(5, "Password needs 5 digit minimun"),
        department: z.string().min(1, "need a department"),
        position: z.string().min(1, "position is required")
    });

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        department: "",
        position: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setServerError("");
        setSuccessMessage("");

        const result = employeSchema.safeParse(formData);

        // Frontend Validation
        if (!result.success) {

            const fieldErrors: any = {};

            result.error.issues.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });

            setErrors(fieldErrors);

            return;
        }

        setErrors({});

        try {

            setLoading(true);

            const response = await axios.post(
                `${API_BASE_URL}/users/employee/create`,
                formData
            );

            console.log(response.data);

            setSuccessMessage("Employee registered successfully");

            // Reset form
            setFormData({
                fullname: "",
                email: "",
                phone: "",
                password: "",
                department: "",
                position: ""
            });

        } catch (err: any) {

            if (err.response) {



                setServerError(
                    err.response.data.message || "Something went wrong"
                );

            } else {

                setServerError("Server is not responding");
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%]">
                {serverError && (
                    <p className="text-red-500 text-center">
                        {serverError}
                    </p>
                )}

                {successMessage && (
                    <p className="text-green-500 text-center">
                        {successMessage}
                    </p>
                )}

                <input
                    type="text"
                    name="fullname"
                    placeholder="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
                />
                {errors.fullname && (
                    <p className="text-red-500 text-sm">
                        {errors.fullname}
                    </p>
                )}                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">
                        {errors.email}
                    </p>
                )}

                <input
                    type="text"
                    name="phone"
                    placeholder="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
                />

                {errors.phone && (
                    <p className="text-red-500 text-sm">
                        {errors.phone}
                    </p>
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password}
                    </p>
                )}

                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white text-black"
                >
                    <option value="">Select a department</option>
                    <option value="sales">SALES</option>
                    <option value="support">SUPPORT</option>
                </select>
                {errors.department && (
                    <p className="text-red-500 text-sm">
                        {errors.department}
                    </p>
                )}

                <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white text-black"
                >

                    <option value="">Select a position</option>
                    <option value="user">USER</option>
                    <option value="employee">EMPLOYEE</option>
                    <option value="manager">MANAGER</option>
                    <option value="salesman">SALESMAN</option>
                    <option value="buyer">BUYER</option>
                </select>
                {errors.position && (
                    <p className="text-red-500 text-sm">
                        {errors.position}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded-xl"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </>
    );
}