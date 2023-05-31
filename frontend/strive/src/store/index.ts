import {combineReducers,configureStore,createStore} from '@reduxjs/toolkit';
// import scheduleReducer from './Reducers/schedule-reducers';
// import userReducer from './Reducers/user-reducer';


const reducer =combineReducers({
//   scheduleReducer,
//   userReducer
})
const store = configureStore({reducer:{
//   scheduleReducer,
//   userReducer
}});
console.log("store")
// console.log(store);
export default store;