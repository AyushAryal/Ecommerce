import { createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import OtherReducer from "./Reducers/OtherReducer";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import CustomPersistReducer from "./Reducers/PersistsReducer";
import CartReducer from "./Reducers/CartReducer";
import WishListReducer from "./Reducers/WishListReducer";
const middlewares = [thunk];

const rootReducer = combineReducers({
    Other: OtherReducer,
    User: CustomPersistReducer,
    Cart: CartReducer,
    WishList: WishListReducer,
});

const persistConfig = {
    key: "KnitsAndStitches",
    storage: storage,
    whitelist: ["CustomPersistReducer"], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    pReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
