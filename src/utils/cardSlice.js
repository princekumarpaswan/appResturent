import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: ["burger", "pizza"]
    },
    reducers: {
        addIems: (state, action) => {
            state.items.push(action.payload);
        },
        removeItems: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            state.items.length = 0
        }
    }
})


export const { addIems, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;