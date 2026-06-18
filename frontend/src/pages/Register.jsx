import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios";

const Register=()=>{
const navigate=useNavigate()
const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
})
const handleChange=(e)=>{
    setFormData({
        ...formData,[e.target.name]:e.target.value,
    })
}
const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
        const res =await API.post("/auth/register",formData);
        alert(res.data.message || "Registartion Succesfull"
)
navigate("/login")    }
catch(error){
   alert(
    error.response?.data?.message ||"Reg failed"
   ) 
}
}
return(
<div className="min-h-screen flex items-center justify-center bg-slate-100">
    <form onSubmit={handleSubmit}
    className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <input 
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded  mb-4"
        required/>
         <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />
        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded">
Register
        </button>

    </form>

</div>
)
}
export default Register