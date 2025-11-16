import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./Features/Customers/CustomerSlice";
import accountReducer from "./Features/Accounts/AccountSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
