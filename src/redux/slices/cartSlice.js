/* eslint-disable eqeqeq */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.title + '_' + obj.type + '_' + obj.size ==
          action.payload.title + '_' + action.payload.type + '_' + action.payload.size
        );
      });
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          key: action.payload.title + '_' + action.payload.type + '_' + action.payload.size,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    addCount(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.title + '_' + obj.type + '_' + obj.size ==
          action.payload.title + '_' + action.payload.type + '_' + action.payload.size
        );
      });
      findItem.count++;
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    subCount(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.title + '_' + obj.type + '_' + obj.size ==
          action.payload.title + '_' + action.payload.type + '_' + action.payload.size
        );
      });
      findItem.count--;
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItems(state, action) {
      state.items = state.items.filter((obj) => obj.key != action.payload.key);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, addCount, subCount, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
