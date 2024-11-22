import { combineReducers } from '@reduxjs/toolkit';
import  userSlice  from './slices/user';

const rootReducer = combineReducers({
    user : userSlice
});

export default rootReducer;
