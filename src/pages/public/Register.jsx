import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUser } from "../../api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "user"]),
});

export default function Register() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      alert("User Registered Successfully");
    //   window.location.href = "/login";
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] p-6 bg-white shadow-lg rounded-xl">

        <h2 className="text-2xl font-bold text-center mb-5">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <Input placeholder="Name" {...register("name")} />
          <p className="text-red-500">{errors.name?.message}</p>

          <Input placeholder="Email" {...register("email")} />
          <p className="text-red-500">{errors.email?.message}</p>

          <Input type="password" placeholder="Password" {...register("password")} />
          <p className="text-red-500">{errors.password?.message}</p>

          <select {...register("role")} className="w-full border p-2 rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <Button className="w-full">Register</Button>

        </form>
      </div>
    </div>
  );
}