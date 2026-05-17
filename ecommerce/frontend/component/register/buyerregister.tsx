import { z } from "zod";
import { useState } from "react";
export default function BuyerRegister() {
    const buyerSchema = z.object({
        fullname: z.string().min(1, "Name is required"),
        email: z.string().email("email is invalid"),
        phone: z.string().min(11, "Phone number should be 11 digit"),
        password: z.string().min(5, "Password needs 5 digit minimun"),

    });

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: ""

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
        const result = buyerSchema.safeParse(formData);
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
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 " />

                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Register
                </button>

            </form>

        </>
    );
}