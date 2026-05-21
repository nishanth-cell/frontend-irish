import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct,
} from "../../api/products";

import ProductCard from "../../components/ProductCard";

import ProductSkeleton from "../../loading/ProductSkeleton";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Products() {

  const { token } = useSelector(
    (state) => state.auth
  );

  const [products, setProducts] =
    useState([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const [hasMore, setHasMore] =
    useState(true);

  const navigate = useNavigate();

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await getProducts(page);

      // NO MORE PRODUCTS
      if (res.data.length === 0) {

        setHasMore(false);

        return;
      }

      // APPEND PRODUCTS
      setProducts((prev) => [
        ...prev,
        ...res.data,
      ]);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  // PAGE CHANGE
  useEffect(() => {

    fetchProducts();

  }, [page]);

  // INFINITE SCROLL
  useEffect(() => {

    const handleScroll = () => {

      if (
        window.innerHeight +
          document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {

        setPage((prev) => prev + 1);

      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, [loading, hasMore]);

  // DELETE
  const handleDelete = async (id) => {

    await deleteProduct(id, token);

    // REMOVE FROM UI
    setProducts((prev) =>
      prev.filter((p) => p._id !== id)
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold">
          Products
        </h2>

        <button
          onClick={() =>
            navigate(
              "/admin/products/add"
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((p) => (

          <ProductCard
            key={p._id}
            product={p}
            isAdmin={true}
            onDelete={handleDelete}
            onEdit={() =>
              navigate(
                `/admin/products/edit/${p._id}`
              )
            }
          />

        ))}

        {/* SKELETON */}
        {loading &&
          [...Array(3)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}

      </div>

      {/* NO MORE */}
      {!hasMore && (
        <p className="text-center text-gray-500 mt-6">
          No more products
        </p>
      )}

    </div>
  );
}