import {configureStore} from '@reduxjs/toolkit';
import memesReducer from '../Features/memesApi';
const store = configureStore({
  reducer: {
    memes: memesReducer,
  },
});

export default store;
