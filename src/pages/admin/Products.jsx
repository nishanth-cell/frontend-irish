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

   const [deletingId, setDeletingId] = useState(null);

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

  const fetchProducts = async (currentPage) => {
  try {
    setLoading(true);

    const res = await getProducts(currentPage);

    if (res.data.length === 0) {
      setHasMore(false);
      return;
    }

   
    setProducts((prev) => {

      const newProducts = res.data.filter(
        (newItem) =>
          !prev.some(
            (oldItem) =>
              oldItem._id === newItem._id
          )
      );

      return [...prev, ...newProducts];
    });
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchProducts(page);
}, [page]);

 useEffect(() => {
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (
      scrollTop + windowHeight >= scrollHeight - 50 &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }

    
    if (
      scrollTop <= 100 &&
      !loading &&
      page > 1
    ) {
      setPage((prev) => prev - 1);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () =>
    window.removeEventListener("scroll", handleScroll);
}, [loading, hasMore, page]);

  
 const handleDelete = async (id) => {
  try {
     setDeletingId(id);

    await deleteProduct(id, token);

    // REMOVE FROM UI
    setProducts((prev) =>
      prev.filter((p) => p._id !== id)
    );
  } catch (error) {
    console.log(error);
  } finally {
   setDeletingId(null);
  }
};
  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-all duration-300">

      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold text-black dark:text-white">
  Products
</h2>

        <button
  onClick={() => navigate("/admin/products/add")}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
>
  + Add Product
</button>

      </div>

    
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((p) => (

          <ProductCard
            key={p._id}
            product={p}
            isAdmin={true}
            onDelete={handleDelete}
            deletingId ={deletingId }
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

      
      {!hasMore && (
  <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
    No more products
  </p>
)}

    </div>
  );
}