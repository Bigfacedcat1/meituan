import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
  name: "food",
  initialState: {
    //商品列表
    foodsList: [],
    //菜单下标
    activeIndex: 0,
    //购物车列表
    carList: [],
  },
  reducers: {
    //更改商品列表
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    //更改activeIndex
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    //添加购物车
    addCart(state, action) {
      //是否添加过
      const item = state.carList.find((item) => item.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        state.carList.push({ ...action.payload, count: 1 });
      }
    },
    //count增
    increCount(state, action) {
      const item = state.carList.find((item) => item.id === action.payload.id);
      item.count++;
    },
    //count减
    decreCount(state, action) {
      const item = state.carList.find((item) => item.id === action.payload.id);
      if (item.count > 1) {
        item.count--;
      } else {
          state.carList.splice(state.carList.indexOf(item), 1);
      }
      },
    //清空购物车
    clearCarList(state) {
        state.carList = [];
    }
  },
});

//异步获取部分
const { setFoodsList, changeActiveIndex, addCart,increCount,decreCount, clearCarList } = foodsStore.actions;
const fetchFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3004/takeaway");
    dispatch(setFoodsList(res.data));
  };
};

export { fetchFoodsList, changeActiveIndex, addCart,increCount,decreCount,clearCarList };

const reducer = foodsStore.reducer;
export default reducer;
