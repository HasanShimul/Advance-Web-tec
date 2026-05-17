'use client'
import API_BASE_URL from "@/app/config/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"





export default function(){

    const[token,setToken] = useState<string | null>(null);
    const[profile,setProfile] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
       
    },[]);

    const handleLogout = () =>{
        localStorage.removeItem("token");
        router.push("/login");
    }
    const getProfile = async () =>{
        try{
          if(!token){
            console.log("No token found.");
            setError("Login again.");
            return;
          }

           console.log("Token front end  :" + token);
          const response = await axios.get(`${API_BASE_URL}/admin/profile`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            
          );
          console.log("Profile : " + response.data);
          setProfile(response.data);

        }catch (err:any){
            console.log("Something went wrong " + err);
            if(err.response){
                if(err.response.status == 401){
                    setError("Session expired. Please Login.");
                    localStorage.removeItem("token");
                }
            }
            else{
                setError("Server is not responding.");
            }

        }

      };
      

    return(
        <>
        <div className="min-h-screen w-full">
           
          <header className="flex justify-around py-2 w-full bg-slate-600 mt-4">
            <div className="">
                <button className="text-green-500" onClick={getProfile}>Profile</button>
             </div>
            <div className="">header 2 </div>
            <div className="">
                <button className="text-red-500 text-xl" onClick={handleLogout}>Logout</button>
             </div>

          </header>

          {error &&
          <div className="text-red-500 text-2xl text-center">{error}</div>}
           
        </div>
        </>
    )
}