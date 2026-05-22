import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginUser } from "../../api/auth";
import { setToken } from "../../utils/token";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import {setCart} from "../../redux/cartSlice";
import {getCart} from "../../api/cart";
import { toast } from "sonner";


const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export default function Login() {
    const { token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const res = await loginUser(data);

    console.log("LOGIN RESPONSE:", res.data);

    const { token, user } = res.data;

    if (!token || !user) {
      console.log("Invalid response");
      return;
    }

    setToken(token);

    dispatch(loginSuccess({ user, token }));

    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    //alert("Login Success");
    toast.success("Login Success");

    if (user.role === "admin") {
      navigate("/admin/products");
    } else {
      navigate("/");
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    // alert(
    //   err.response?.data?.message ||
    //   "Login failed"
    // );
    toast.error( err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const loadCart = async () => {
    const res = await getCart(token);
    console.log(res,"res");
    dispatch(setCart(res.data.items));
  };

  if (token) loadCart();
}, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 transition-all duration-300">
      <div className="w-[400px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl transition-all duration-300">
        <h2 className="text-2xl font-bold text-center mb-5 text-black dark:text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <Input placeholder="Email"className="dark:bg-gray-800 dark:text-white" {...register("email")} />
            <p className="text-red-500 text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <Input type="password" placeholder="Password" className="dark:bg-gray-800 dark:text-white" {...register("password")} />
            <p className="text-red-500 text-sm">
              {errors.password?.message}
            </p>
          </div>

          <Button disabled={loading}  className="w-full bg-blue-600 hover:bg-blue-700 text-white">
 {loading ? "Logging in..." : "Login"}
</Button>

        </form>
      </div>
    </div>
  );
}