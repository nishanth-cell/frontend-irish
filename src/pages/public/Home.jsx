import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard";
import ProductSkeleton from "../../loading/ProductSkeleton";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);


  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await getProducts(page);

      // IF NO MORE PRODUCTS
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

  return (
    <div className="p-5">

      {/* PRODUCTS */}
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
        <p className="text-center mt-6 text-gray-500">
          No more products
        </p>
      )}

    </div>
  );
}