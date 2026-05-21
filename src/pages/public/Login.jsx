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
import {useEffect} from "react";
import {setCart} from "../../redux/cartSlice";
import {getCart} from "../../api/cart";


const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export default function Login() {
    const { token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
  try {
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

    localStorage.setItem( "user",JSON.stringify(res.data.user));

    alert("Login Success");

    // Role redirect (important for assignment)
    // if (user.role === "admin") {
    //   window.location.href = "/admin";
    // } else {
    //   window.location.href = "/home";
    // }
        
    if (user.role === "admin") {
      navigate("/admin/products");
    } else {
      navigate("/");
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    alert(err.response?.data?.message || "Login failed");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] p-6 bg-white shadow-lg rounded-xl">

        <h2 className="text-2xl font-bold text-center mb-5">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <Input placeholder="Email" {...register("email")} />
            <p className="text-red-500 text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <Input type="password" placeholder="Password" {...register("password")} />
            <p className="text-red-500 text-sm">
              {errors.password?.message}
            </p>
          </div>

          <Button className="w-full">Login</Button>

        </form>
      </div>
    </div>
  );
}