"use client";
import AdminRegister from "@/component/register/adminregister";
import BuyerRegister from "@/component/register/buyerregister";
import EmployeeRegister from "@/component/register/employeeregister";
import SellerRegister from "@/component/register/sellerregister";
import { useState } from "react";

export default function Register() {
    const [type, setType] = useState("admin");
    return (
        <>
            <div className="min-h-screen  flex  justify-center">
                <div className="">
                    <h1 className="w-full px-10 text-2xl md:text-4xl m-5 flex items-center">Welcome to the registration panel</h1>
                    <div className="flex flex-2 gap-4 rounded p-2 text0.5xl md:text-xl items-center justify-center">

                        <button
                            onClick={() => setType("admin")}
                            className={`px-4 py-2 rounded font-medium transition ${type === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 text-black hover:gray-100"}`}>
                            Admin
                        </button>

                        <button
                            onClick={() => setType("employee")}
                            className={`px-4 py-2 rounded font-medium transition 
                          ${type === "employee" ? "bg-blue-600 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}>
                            Emloyee
                        </button>

                        <button
                            onClick={() => setType("seller")}
                            className={`px-4 py-2 rounded font-medium transition
                      ${type === "seller" ? "bg-blue-600 trxt-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}>
                            Seller
                        </button>

                        <button
                            onClick={() => setType("buyer")}
                            className={`px-4 py-2 rounded font-medium transition
                    ${type === "buyer" ? "bg-blue-600 trxt-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}>
                            Buyer
                        </button>
                    </div>

                    <div className="mt-10 flex justify-center items-center min-w-80%">
                        {type === "admin" && <AdminRegister />}
                        {type === "employee" && <EmployeeRegister />}
                        {type === "buyer" && <BuyerRegister />}
                        {type === "seller" && <SellerRegister />}

                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}