"use client";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import API_BASE_URL from "@/app/config/api";
import VerifyEmail from "@/app/register/verification";


const adminSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.email(" email is not valid"),

  password: z.string().min(5, "Password must be at least 5 characters"),
  phone: z.string().min(11, "Phone must be at least 11 digits"),
  confirm_password: z.string(),
  city: z.string().min(1, "City is also required.")

}).superRefine((data, ctx) => {
  if (data.password !== data.confirm_password) {
    ctx.addIssue({
      path: ["confirm_password"],
      message: "Passwords do not match",
      code: "custom",
    });
  }
});

type FormErrors = {
  fullName?: string[];
  email?: string[];
  password?: string[];
  confirm_password?: string[];
  phone?: string[];
  city?: string[];
};

export default function AdminRegister() {


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    city: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<"register" | "verify">("register");
  const [registeredEmail, setRegisteredEmail] = useState("");



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   const result = adminSchema.safeParse(formData);
  //   if (!result.success) {
  //     const fieldError = result.error.flatten().fieldErrors;
  //     setErrors(fieldError);
  //     return;
  //   }
  //   setErrors({});
  //   console.log("valid data : ",result.data)
  // }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    console.log("API : " + API_BASE_URL);
    console.log("Register button clicked.");

    const result = adminSchema.safeParse(formData);
    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors as FormErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const { confirm_password, ...payload } = result.data;

    try {
      console.log("API : " + API_BASE_URL);
      console.log("type : " + typeof API_BASE_URL);
      const url = `${API_BASE_URL}/admin/signup`;
      console.log("FINAL URL:", url);

      await axios.post(
        `${API_BASE_URL}/admin/signup`,
        payload
      );
     // setSuccess(true);
      setRegisteredEmail(result.data.email);
      setStep("verify");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message;
        setApiError(Array.isArray(msg) ? msg.join(", ") : msg || "Something went wrong.");

      } else {
        setApiError("Network error or server is off.");
      }
    } finally {
      setLoading(false);
    }

  };
  // if (success) {
  //   return <p className="text-green-500 text-center text-xl">✓ Registration Successful!</p>;

  // }
  if(step == "verify"){
    return <VerifyEmail email={registeredEmail}/>
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%]" noValidate >
      <input
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"

      />
      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName[0]}</p>}
      <input
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}

      <input
        type="password"
        name="password"
        placeholder="Set your secrete key"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
      <input
        type="password"
        name="confirm_password"
        placeholder="Set your secrete key again"
        value={formData.confirm_password}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
      />
      {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password[0]}</p>}
      <input
        type="text"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}
      <input
        type="text"
        name="city"
        placeholder="Enter your city"
        value={formData.city}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
      />
      {errors.city && <p className="text-red-500 text-sm">{errors.city[0]}</p>}
      {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}
      <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-purple-700 to-indigo-800 transition-all transform hover:scale-[1.02] shadow-lg"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}