import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
// import { clearCart } from "../redux/cartSlice";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
   <nav className="bg-white text-black dark:bg-gray-900 dark:text-white px-4 py-3 shadow-md transition-all duration-300">
      
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          E-COM
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          
          <Link className="hover:text-blue-500 dark:hover:text-yellow-400" to="/">
            Home
          </Link>

          {!user && (
            <>
              <Link className="hover:text-blue-500 dark:hover:text-yellow-400" to="/login">
                Login
              </Link>
              <Link className="hover:text-blue-500 dark:hover:text-yellow-400" to="/register">
                Register
              </Link>
            </>
          )}

          {/* USER */}
          {role === "user" && (
           <Link
  className="hover:text-blue-500 dark:hover:text-yellow-400 relative"
  to="/cart"
>
  Cart

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</Link>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              {/* <Link className="hover:text-blue-500 dark:hover:text-yellow-400" to="/admin/dashboard">
                Dashboard
              </Link> */}
              <Link className="hover:text-blue-500 dark:hover:text-yellow-400" to="/admin/products">
                Products
              </Link>
              <Link className="hover:text-blue-500 dark:hover:text-yellow-400" to="/admin/products/add">
                Add Product
              </Link>
              <Link className="hover:text-blue-500 dark:hover:text-yellow-400" to="/admin/users">
                Users
              </Link>
            </>
          )}

          
         
  <div className="flex items-center gap-4">
 {user && (
    <p className="text-yellow-400 font-semibold">
      Hi, {user.name}
    </p>
 )}
    <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="p-2 rounded-full 
             bg-gray-200 text-black 
             dark:bg-gray-700 dark:text-white 
             hover:scale-110 transition-all duration-300"
>
  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
</button>
 {user && (
    <button
      onClick={() => {
        dispatch(logout());
        localStorage.clear();
        navigate("/login");
      }}
      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
    >
      Logout
    </button>
 )}
  </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-white text-black dark:bg-gray-800 dark:text-white p-3 rounded-lg transition-all duration-300">
          
          <Link onClick={() => setOpen(false)} to="/">
            Home
          </Link>

          {!user && (
            <>
              <Link onClick={() => setOpen(false)} to="/login">
                Login
              </Link>
              <Link onClick={() => setOpen(false)} to="/register">
                Register
              </Link>
            </>
          )}

          {role === "user" && (
            <Link
  onClick={() => setOpen(false)}
  to="/cart"
  className="relative w-fit"
>
  Cart

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</Link>
          )}

          {role === "admin" && (
            <>
              
              <Link onClick={() => setOpen(false)} to="/admin/products">
                Products
              </Link>
              <Link onClick={() => setOpen(false)} to="/admin/products/add">
                Add Product
              </Link>
              <Link onClick={() => setOpen(false)} to="/admin/users">
                Users
              </Link>
            </>
          )}

        
  <div className="flex flex-col gap-2">
 {user && (
    <p className="text-yellow-400 font-semibold">
      Hi, {user.name}
    </p>
 )}

    <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="px-4 py-2 rounded-full flex items-center gap-2 
             bg-gray-200 text-black 
             dark:bg-gray-700 dark:text-white 
             hover:scale-105 transition-all duration-300"
>
  {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
</button>
{user&&(
    <button
      onClick={() => {
        dispatch(logout());

        localStorage.clear();

        navigate("/login");
      }}
      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
    >
      Logout
    </button>
    )}

  </div>

        </div>
      )}
    </nav>
  );
}