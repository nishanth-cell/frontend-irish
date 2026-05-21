import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload; // full cart replace
    },
    addToCart: (state, action) => {
  state.items.push({
    ...action.payload,
    quantity: 1,
  });
},

    removeFromCart: (state, action) => {
  state.items = state.items.filter(
    (item) => item.productId !== action.payload
  );
},

increaseQty: (state, action) => {
  const item = state.items.find(
    (p) => p.productId === action.payload
  );

  if (item) {
    item.quantity += 1;
  }
},

decreaseQty: (state, action) => {
  const item = state.items.find(
    (p) => p.productId === action.payload
  );

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
},

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;