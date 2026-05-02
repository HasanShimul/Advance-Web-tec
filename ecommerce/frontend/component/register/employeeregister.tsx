import { useState } from "react";
import { deprecate } from "util";
import { email, z } from "zod";

export default function EmployeeRegister() {

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
        deprtment: "",
        position: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const result = employeSchema.safeParse(formData);
        if (!result.success) {
            console.log(result.error.format());
            return;
        }
        console.log("Valid Form data", result);
    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-3">

                <input
                    type="text"
                    name="fullname"
                    placeholder="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="border p-2" />
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2" />

                <input
                    type="text"
                    name="phone"
                    placeholder="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-2" />

                <input
                    type="text"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 " />

                <select
                    name="deprtment"
                    value={formData.deprtment}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black"
                >
                    <option value="">Select a department</option>
                    <option value="sales">SALES</option>
                    <option value="support">SUPPORT</option>
                </select>

                <select
                    name=" position"
                    value={formData.position}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black" >
                    <option value="">Select a position</option>
                    <option value="user">USER</option>
                    <option value="employee">EMPLOYEE</option>
                    <option value="manager">MANAGER</option>
                    <option value="salesman">SALESMAN</option>
                    <option value="buyer">BUYER</option>
                </select>

                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Register
                </button>
            </form>
        </>
    );
}