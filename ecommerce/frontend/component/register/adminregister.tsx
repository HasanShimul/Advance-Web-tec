import { useState } from "react";
import { z } from "zod";

export default function AdminRegister(){

    const adminSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email(" email is not valid"),
        password: z.string().min(5, "Password must be at least 5 characters"),
        phone: z.string().min(11, "Phone must be at least 11 digits"),
      });

    const[formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        city:""
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
    
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    const handleSubmit= (e:any) =>{
        e.preventDefault();
        const result = adminSchema.safeParse(formData);
        if(!result.success){
            console.log(result.error.format());
            return;
        }
        console.log("Valid Form data", result);
    }
    return(
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
        <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2"
      />

<input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 rounded"
      />
        <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 rounded"
      />
       <input
        type="text"
        name="city"
        placeholder="city"
        value={formData.city}
        onChange={handleChange}
        className="border p-2 rounded"
      />
         <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Register
      </button>
      </form>
    );
}