import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
// import { iranGovApi } from 'services/api';
import rootReducer from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['my_api']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

setupListeners(store.dispatch);


