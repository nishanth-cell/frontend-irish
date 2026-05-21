import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
// import { clearCart } from "../redux/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      
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
          
          <Link className="hover:text-yellow-400" to="/">
            Home
          </Link>

          {!user && (
            <>
              <Link className="hover:text-yellow-400" to="/login">
                Login
              </Link>
              <Link className="hover:text-yellow-400" to="/register">
                Register
              </Link>
            </>
          )}

          {/* USER */}
          {role === "user" && (
           <Link
  className="hover:text-yellow-400 relative"
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
              {/* <Link className="hover:text-yellow-400" to="/admin/dashboard">
                Dashboard
              </Link> */}
              <Link className="hover:text-yellow-400" to="/admin/products">
                Products
              </Link>
              <Link className="hover:text-yellow-400" to="/admin/products/add">
                Add Product
              </Link>
              <Link className="hover:text-yellow-400" to="/admin/users">
                Users
              </Link>
            </>
          )}

          
          {user && (
  <div className="flex items-center gap-4">

    <p className="text-yellow-400 font-semibold">
      Hi, {user.name}
    </p>

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

  </div>
)}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-gray-800 p-3 rounded-lg">
          
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

         {user && (
  <div className="flex flex-col gap-2">

    <p className="text-yellow-400 font-semibold">
      Hi, {user.name}
    </p>

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

  </div>
)}
        </div>
      )}
    </nav>
  );
}