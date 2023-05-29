import { createStore } from "redux";
import reducer from "./reducer";

// Create the store
const store = createStore(reducer);

export default store;
