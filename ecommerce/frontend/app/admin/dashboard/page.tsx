'use client'
import API_BASE_URL from "@/app/config/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import pusher from "@/app/config/pusher";
import { z } from "zod";


const employeeSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number"),
  password: z.string().min(5, "Min 5 characters required"),
  department: z.string().min(1, "Select department"),
  position: z.string().min(1, "Select position"),
});


export default function () {

  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [employeeerrors, setEmployeeErrors] = useState<any>({});
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeecreating, setEmployeeCreating] = useState(false);
  const [empLoading, setEmpLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [empdelete, setEmpDelete] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

  }, []);

  useEffect(() => {
    if (profile) {
      setname(profile.fullName);
      setPhone(profile.phone);
    }
  }, [profile]);

  useEffect(() => {
    const channel = pusher.subscribe("admin-channel");

    channel.bind("employee-created", (data: any) => {
      console.log("Notification received:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, []);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    position: ""
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  }
  const getProfile = async () => {
    try {
      if (!token) {
        console.log("No token found.");
        setError("login again.");
        return;
      }
      setLoading(true);
      console.log("Token front end  :" + token);
      const response = await axios.get(`${API_BASE_URL}/admin/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );
      console.log("Profile : ", response.data);
      setProfile(response.data);

    } catch (err: any) {
      console.log("Something went wrong " + err);
      if (err.response) {
        if (err.response.status == 401) {
          setError("Session expired. Please Login");
          localStorage.removeItem("token");
        }
      }
      else {
        setError("Server is not responding.");
      }

    } finally {
      setLoading(false);
    }

  };

  const updateProfile = async () => {
    try {
      const updatedData: any = {};

      if (name !== profile.fullName) {
        updatedData.fullName = name;
      }

      if (phone !== profile.phone) {
        updatedData.phone = phone;
      }
      if (Object.keys(updatedData).length === 0) {
        console.log("Nothing to update");
        return;
      }
      const response = await axios.put(
        `${API_BASE_URL}/admin/profile/update`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setProfile(response.data);

    } catch (err: any) {
      console.log("update profile error :", err);
      setError("Can't change profile");
    }
  }


  const createEmployee = async () => {
    const result = employeeSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: any = {};

      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      setEmployeeErrors(fieldErrors);
      return;
    }

    setEmployeeErrors({});
    setEmployeeCreating(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/signup/employee`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      console.log("Employee created:", response.data);
      setSuccessMessage(
        response.data.data
        // `Employee ${response.data.fullname} created successfully by ${response.data.createdBy?.name}`
      );

      setShowForm(false);

    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        if (status == 403) {
          setError("you are not allowed to create employee . need verified email.");
        }
        else if (status === 401) {
          setError("Session expired. Please login again");
          localStorage.removeItem("token");
          router.push("/login");
        } else if (status == 400) {
          setEmployeeErrors(err.response.message);
        }
        else {
          setError("Something went wrong");
        }
        console.log("Error creating employee", err.response.data);

      } else {
        setError("Server is not responding");
      }
    } finally {
      setEmployeeCreating(false);
    }
  };


  const getAllEmployee = async () => {
    try {
      setEmpLoading(true);
      setEmployeeErrors(null);

      const response = await axios.get(
        `${API_BASE_URL}/admin/find/employees/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Employees:", response.data);

      setEmployees(response.data);

    } catch (err: any) {

      if (err.response) {
        const status = err.response.status;

        if (status === 403) {
          setEmployeeErrors(err.response.data.message);
        }
        else if (status === 401) {
          setEmployeeErrors("Session expired. Please login again");
          localStorage.removeItem("token");
          router.push("/login");
        }
        else {
          setEmployeeErrors("Failed to load employees");
        }

        console.log("Employee fetch error:", err.response.data);

      } else {
        setEmployeeErrors("Server is not responding");
      }

    } finally {
      setEmpLoading(false);
    }
  };


  const deleteEmployeeById = async (id: number) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/admin/delete/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      setEmpDelete(`Employee ID ${id} deleted successfully`);

    } catch (err: any) {

      if (err.response) {
        const status = err.response.status;

        if (status === 403) {
          setError("You are not allowed to delete employee (need verified admin)");
        }
        else if (status === 401) {
          setError("Session expired. Please login again");
          localStorage.removeItem("token");
          router.push("/login");
        }
        else if (status === 400) {
          setError(err.response.data.message || "Bad request");
        }
        else {
          setError("Failed to delete employee");
        }

        console.log("Delete error:", err.response.data);

      } else {
        setError("Server is not responding");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen  ">

        <header className="flex justify-around py-2 w-full bg-slate-600 mt-4 h-[7vh]">
          <div className="">
            <button className="text-green-500" onClick={getProfile}>Profile</button>
            {notifications.length > 0 &&
              (
                <div className="bg-black text-white p-2">
                  {notifications.map((n, i) => (
                    <p key={i}>
                      {n.message || JSON.stringify(n)}
                    </p>
                  ))}
                </div>
              )}
          </div>
          <div onClick={getAllEmployee}>Employee List</div>
          <div className="">
            <button onClick={() => setShowForm(true)}>Create Employee</button>
          </div>
          <div className="">
            <button className="text-red-500 text-xl" onClick={handleLogout}>Logout</button>
          </div>
          <div className="flex flex-col">
            <input type="number"
              name="id"
              value={deleteId ?? ""}
              placeholder="id"
              onChange={(e) => setDeleteId(Number(e.target.value))}
              className="border border-2 border-blue-600 w-16 pl-1" />
            <button onClick={() => {
              if (deleteId === null) return;
              deleteEmployeeById(deleteId);
            }} className="text-red-500 ">Delete Employee</button>
          </div>

        </header>
        <main className="flex flex-col mt-5 justify-center items-center">
          {loading && <p>Loading Profile...</p>}
          {!loading && profile &&
            <div className="flex flex-col bg-slate-800 text-xl gap-4 p-4 rounded-xl w-[60%] text-center text-shadow-white">
              <p> Name : {profile.fullName}</p>
              <p>Email : {profile.email}</p>
              <p>Phone : {profile.phone}</p>
              <p>City : {profile.city}</p>
            </div>
          }

          {empdelete && (
            <div className="bg-red-600 text-white p-3 rounded mt-4">
              {empdelete}
            </div>
          )}

          {profile &&
            <>

              <div className="">
                <div className="flex m-4">
                  <input type="text"
                    value={name}
                    onChange={(e) => { setname(e.target.value) }}
                    className="text-black dark:text-white p-1 rounded border-2 border-solid border-blue-500" />


                  <button
                    className="flex bg-green-500 px-3 py-1 rounded"
                    onClick={updateProfile}
                  >
                    {!loading && <p>Update Name</p>}
                  </button>
                </div>
                <div className="flex m-4">
                  <input type="text"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                    className="text-black dark:text-white p-1 rounded border-2 border-solid border-blue-500" />


                  <button
                    className="flex bg-green-500 px-3 py-1 rounded"
                    onClick={updateProfile}
                  >
                    {!loading && <p>Update Phone</p>}
                  </button>

                </div>
              </div>
            </>}


          {successMessage && (
            <div className="bg-green-600 text-white p-3 rounded mt-4">
              {successMessage}
            </div>
          )}
          {showForm && (
            <div className="bg-slate-800 p-6 rounded-xl w-[60%] mt-4 flex flex-col gap-3">

              <input
                placeholder="Full Name"
                value={form.fullname}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                className="p-2 rounded text-black dark:bg-white "
              />
              {employeeerrors.fullname && (
                <p className="text-red-500 text-sm">{employeeerrors.fullname}</p>
              )}

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="p-2 rounded text-black dark:bg-white"
              />
              {employeeerrors.email && (
                <p className="text-red-500 text-sm">{employeeerrors.email}</p>
              )}

              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="p-2 rounded text-black dark:bg-white"
              />
              {employeeerrors.phone && (
                <p className="text-red-500 text-sm">{employeeerrors.phone}</p>
              )}

              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="p-2 rounded text-black dark:bg-white"
              />
              {employeeerrors.password && (
                <p className="text-red-500 text-sm">{employeeerrors.password}</p>
              )}

              <select
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                className="p-2 rounded text-black dark:bg-white"
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="SALES">SALES</option>
                <option value="SUPPORT">SUPPORT</option>
              </select>
              {employeeerrors.department && (
                <p className="text-red-500 text-sm">{employeeerrors.department}</p>
              )}

              <select
                value={form.position}
                onChange={(e) =>
                  setForm({ ...form, position: e.target.value })
                }
                className="p-2 rounded text-black dark:bg-white"
              >
                <option value="">Select Position</option>
                <option value="ADMIN">ADMIN</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="SALESMAN">SALESMAN</option>
                <option value="USER">USER</option>
              </select>

              {employeeerrors.position && (
                <p className="text-red-500 text-sm">{employeeerrors.position}</p>
              )}

              <button
                className="bg-green-500 px-4 py-2 rounded text-white"
                onClick={createEmployee}
              >
                {employeecreating ? "Creating..." : "Create"}
              </button>

            </div>
          )}



          {empLoading && <p className="text-white">Loading employees...</p>}

          {/* {employees.length == 0 && (!empLoading) &&
            <p className="text-white text-2xl text-center">No Employee is found</p>
          } */}

          {employees.length > 0 && (
            <div className="mt-6 w-[60%] flex flex-col gap-3">

              <h2 className="text-white text-xl text-center">
                All Employees
              </h2>

              {employees.map((emp: any) => (
                <div
                  key={emp.id}
                  className="bg-slate-700 text-white p-3 rounded"
                >
                  <p>Id: {emp.id}</p>
                  <p>Name: {emp.fullname}</p>
                  <p>Email: {emp.email}</p>
                  <p>Phone: {emp.phone}</p>
                  <p>Department: {emp.department}</p>
                  <p>Position: {emp.position}</p>
                </div>
              ))}
            </div>
          )}


        </main>


        {error &&
          <div className="text-red-500 text-2xl text-center">{error}</div>}

      </div>
    </>
  )
}