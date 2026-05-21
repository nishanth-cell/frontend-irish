import { useSelector, useDispatch } from "react-redux";
import {setCart,} from "../../redux/cartSlice";
import { removeFromCartd,clearCartApi,increaseCartQty,decreaseCartQty } from "../../api/cart";
import { Button } from "@/components/ui/button";



export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  console.log("items",items);
  const {token} = useSelector((state)=> state.auth);

  const total = items.reduce(
    (acc, item) => acc + item.rate * item.quantity,
    0
  );

  const handleRemove = async (id) => {
  try {
    const res = await removeFromCartd(id, token);

    dispatch(setCart(res.data.items));

  } catch (err) {
    console.log(err);
  }
};

const handleClearCart = async () => {
  try {
    const res = await clearCartApi(token);

    dispatch(setCart(res.data.items));

  } catch (err) {
    console.log(err);
  }
};

  // INCREASE
  const handleIncrease = async (id) => {
    try {
      const res = await increaseCartQty(id, token);

      dispatch(setCart(res.data.items));

    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrease = async (id) => {
  try {
    const res = await decreaseCartQty(
      id,
      token
    );

    dispatch(setCart(res.data.items));

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="p-5 min-h-screen bg-gray-50">

      <h1 className="text-2xl font-bold mb-5">My Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          <div className="grid gap-4">

            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  className="h-20 w-20 object-cover rounded"
                />

                {/* DETAILS */}
                <div className="flex-1 px-4 text-center sm:text-left">
                  <h2 className="font-bold">{item.title}</h2>
                  <p>₹ {item.rate}</p>
                  <p>Qty: {item.quantity}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-3 sm:mt-0">

                 <Button
  onClick={() =>
    handleDecrease(item.productId)
  }
  disabled={item.quantity <= 1}
  className="disabled:opacity-50 disabled:cursor-not-allowed"
>
  -
</Button>

                 <Button
  onClick={() =>
    handleIncrease(item.productId)
  }
  disabled={
    !item.stock ||
    item.quantity >= item.stock
  }
  className="disabled:opacity-50 disabled:cursor-not-allowed"
>
  +
</Button>
                  <Button
  variant="destructive"
  onClick={() => handleRemove(item.productId)}
>
  Remove
</Button>

                </div>

              </div>
            ))}

          </div>

          {/* TOTAL */}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Total: ₹ {total}
            </h2>

           <Button
  className="mt-3 bg-red-600 text-white"
  onClick={handleClearCart}
>
  Clear Cart
</Button>
          </div>
        </>
      )}
    </div>
  );
}