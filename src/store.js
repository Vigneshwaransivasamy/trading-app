import { configureStore } from "@reduxjs/toolkit";
import root from "./reducer/root";

export default configureStore({
  reducer: {
    rootState: root,
  },
});
