'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import API_BASE_URL from "../config/api";
import { tr } from "zod/locales";
import axios from "axios";



const LoginSchema = z.object({
  username : z.string().min(1,"User name is required."),
  password:z.string().min(5,"Passsword muust be at least 5 character.")
});

type FormErrors ={
    username?:string[];
    password?:string[]
}
export default function Login() {
    const router = useRouter();

    const[formData,setFormData] = useState({
        username:"",
        password:""
    });

  
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }


    const [errors, setErrors] = useState<FormErrors>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const route = useRouter();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setApiError(null);

        console.log("API from login : " + API_BASE_URL);
        console.log("username :" + formData.username);
        console.log("password : " + formData.password);

        const result = LoginSchema.safeParse(formData);
        console.log("result : " + result.success);
        if(!result.success){
            setErrors(z.flattenError(result.error).fieldErrors as FormErrors);
            return;
        }
        setErrors({});
        
        try{
        //    const response = await axios.post(
        //         `${API_BASE_URL}/admin/login`,
                
        //         {
        //             email:result.data.username,
        //             password:result.data.password
        //         }
        //     );
            const response = await axios.post(
                `${API_BASE_URL}/users/employee/login`,
                {
                    username:result.data.username,
                    password:result.data.password
                }
            );

            const token  = response.data.access_token;
            console.log("Response : " + token);
            localStorage.setItem("token",token);
            localStorage.setItem("username",result.data.username);
           //router.push("/admin/dashboard");
           route.push("/employee/dashboard");
        }
        catch(err:any){
            if(axios.isAxiosError(err)){
                const msg = err.response?.data?.message;
                setApiError(Array.isArray(msg) ? msg.join(", "):msg || "Something went wrong");
            }else{
                setApiError("Network error or backend is offline.");
            }
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md transition-all duration-300">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-3">🔐</div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                        {apiError && 
                        <p className="text-red-500 text-center">{apiError}</p>}
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Username
                        </label>
                        <input
                            type="email"
                            name="username"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
                            value={formData.username}
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username[0]}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                           name="password"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
                            value={formData.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <button className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                           <Link href="register"> Register</Link>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}