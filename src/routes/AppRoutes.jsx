import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import MainLayout from "../layouts/MainLayout";

import ProductSkeleton from "../loading/ProductSkeleton";

const Home = lazy(() => import("../pages/public/Home"));
const Login = lazy(() => import("../pages/public/Login"));
const Register = lazy(() => import("../pages/public/Register"));
const Cart = lazy(() => import("../pages/user/Cart"));

const Products = lazy(() => import("../pages/admin/Products"));
const AddProduct = lazy(() => import("../pages/admin/AddProduct"));
const EditProduct = lazy(() => import("../pages/admin/EditProduct"));
const Users = lazy(() => import("../pages/admin/Users"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          
          <Route path="/" element={<Home />} />
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
    </Suspense>
  );
}