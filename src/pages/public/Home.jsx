import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard";
import ProductSkeleton from "../../loading/ProductSkeleton";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);


 const fetchProducts = async (currentPage) => {
  try {
    setLoading(true);

    const res = await getProducts(currentPage);

    if (res.data.length === 0) {
      setHasMore(false);
      return;
    }

    setProducts(res.data);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  setProducts([]);
  fetchProducts(page);
}, [page]);

  useEffect(() => {
  let timeout;

  const handleScroll = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // NEXT PAGE
      if (
        scrollTop + windowHeight >= scrollHeight - 50 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }

      // PREVIOUS PAGE
      if (
        scrollTop <= 100 &&
        !loading &&
        page > 1
      ) {
        setPage((prev) => prev - 1);
      }
    }, 150);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [loading, hasMore, page]);

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-950 min-h-screen transition-all duration-300">

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
          />
        ))}

        {/* SKELETON LOADING */}
        {loading &&
          [...Array(4)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}

      </div>

      {/* NO MORE PRODUCTS */}
      {!hasMore && (
       <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          No more products
        </p>
      )}

    </div>
  );
}