'use client';

import DashboardHeader from "./components/dashboardheader";
import EmployeeList from "./components/employeelist";
import ChangePhone from "./components/changephone";
import DeleteOwn from "./components/deleteown";

export default function EmployeeDashboard() {

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <DashboardHeader
                username={localStorage.getItem("username")} />

            <div className="grid md:grid-cols-2 gap-6 mt-6">

                <EmployeeList />

                <div>
                    <ChangePhone />

                    <DeleteOwn />
                </div>

            </div>

        </div>
    );
}