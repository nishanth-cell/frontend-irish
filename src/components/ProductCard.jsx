import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import {
  addToCartd,
  increaseCartQty,
  decreaseCartQty,
} from "../api/cart";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  deletingId ,
  product,

  isAdmin = false,

  onDelete,

  onEdit,
}) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user,token } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartItem = cartItems.find(
    (i) =>
      i.productId?.toString() ===
      product._id?.toString()
  );

  // ADD
  const handleAdd = async () => {

    if (!token) {

      alert("Please login first");

      navigate("/login");

      return;
    }

    if (user.role === "admin") {

      alert("admin can't purcahase");
     
       return;
    }


    try {

      const res = await addToCartd(
        product,
        token
      );

      dispatch(setCart(res.data.items));

    } catch (err) {
      console.log(err);
    }
  };

  // INCREASE
  const handleIncrease = async (id) => {

    try {

      const res =
        await increaseCartQty(
          id,
          token
        );

      dispatch(setCart(res.data.items));

    } catch (err) {
      console.log(err);
    }
  };

  // DECREASE
  const handleDecrease = async (id) => {

    try {

      const res =
        await decreaseCartQty(
          id,
          token
        );

      dispatch(setCart(res.data.items));

    } catch (err) {
      console.log(err);
    }
  };

  return (
   <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col text-black dark:text-white">

      {/* IMAGE */}
      <img
        src={
          product.image ||
          "https://via.placeholder.com/400x250"
        }
        className="h-48 w-full object-cover rounded-xl"
      />

      {/* CONTENT */}
      <div className="mt-4 text-center space-y-2 flex-1">

        <h2 className="text-lg font-bold text-black dark:text-white">
          {product.title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>

       <p className="font-bold text-green-600">
          ₹ {product.rate}
        </p>

       <p className="text-sm text-gray-500 dark:text-gray-400">
  Discount: {product.discount}%
</p>

<p className="text-sm text-gray-500 dark:text-gray-400">
  Stock: {product.stock}
</p>

<p className="text-xs text-gray-400 dark:text-gray-500">
  {product.clothType}
</p>
      </div>

      {/* ADMIN BUTTONS */}
      {isAdmin ? (

        <div className="grid grid-cols-2 gap-3 mt-4">

          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => onEdit(product)}
          >
            Edit
          </Button>

        

          <Button
  className="bg-red-500 hover:bg-red-600 text-white"
  onClick={() => onDelete(product._id)}
  disabled={deletingId === product._id}
>
  {deletingId === product._id ? "Deleting..." : "Delete"}
</Button>
          

        </div>

      ) : (

        <>
          {/* USER CART CONTROLS */}

          {!cartItem ? (

            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleAdd}
            >
              Add to Cart
            </Button>

          ) : (

            <div className="flex items-center justify-between mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-2">

              <Button
                onClick={() =>
                  handleDecrease(
                    product._id
                  )
                }
                disabled={
                  cartItem.quantity <= 1
                }
              >
                -
              </Button>

              <span className="font-bold text-black dark:text-white">
                {cartItem.quantity}
              </span>

              <Button
                onClick={() =>
                  handleIncrease(
                    product._id
                  )
                }
                disabled={
                  !product.stock ||
                  cartItem.quantity >=
                    product.stock
                }
              >
                +
              </Button>

            </div>

          )}
        </>
      )}

    </div>
  );
}