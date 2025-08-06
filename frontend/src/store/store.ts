import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/reducer';
import wishListReducer from './wishList/reducer';
import userDataReducer from './userData/reducer';
import filtersReducer from './filters/reducer';
import searchReducer from './search/reducer';
import productsReducer from './products/reducer';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //will save in localStorage

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishListReducer,
  user: userDataReducer,
  filters: filtersReducer,
  search: searchReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: import.meta.env.VITE_ENV !== 'production',
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store); //will persist and rehydrate store ( The store will be save to local storage)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
