import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import Cart from "../pages/user/Cart";


import Products from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Users from "../pages/admin/Users";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
      <Routes>
        <Route element={<MainLayout />}>

  
  <Route path="/" element={<Home />} />
  {/* <Route path="/home" element={<Home />} /> */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  
  <Route
    path="/cart"
    element={
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    }
  />



  <Route
    path="/admin/products"
    element={
      <AdminRoute>
        <Products />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/products/add"
    element={
      <AdminRoute>
        <AddProduct />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/products/edit/:id"
    element={
      <AdminRoute>
        <EditProduct />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/users"
    element={
      <AdminRoute>
        <Users />
      </AdminRoute>
    }
  />
  </Route>


  <Route path="*" element={<div>404 Page Not Found</div>} />

</Routes>
  );
}

