import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUser } from "../../api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
 // role: z.enum(["admin", "user"]),
});

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
       setLoading(true);
      await registerUser(data);
      //alert("User Registered Successfully");
      toast.success("User Registered Successfully");
    //   window.location.href = "/login";
      navigate("/login");
    } catch (err) {
     // alert(err.response?.data?.message || "Register failed");
      toast.error(err.response?.data?.message || "Register failed");
    }finally{
      setLoading(false);
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 transition-all duration-300">
     <div className="w-[400px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl transition-all duration-300">

       <h2 className="text-2xl font-bold text-center mb-5 text-black dark:text-white">
  Register
</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <Input placeholder="Name" className="dark:bg-gray-800 dark:text-white" {...register("name")} />
          <p className="text-red-500">{errors.name?.message}</p>

          <Input placeholder="Email"  className="dark:bg-gray-800 dark:text-white" {...register("email")} />
          <p className="text-red-500">{errors.email?.message}</p>

          <Input type="password" placeholder="Password" className="dark:bg-gray-800 dark:text-white" {...register("password")} />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

         

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
  {loading ? "Registering in..." : "Register"}
</Button>

        </form>
      </div>
    </div>
  );
}