import { configureStore } from '@reduxjs/toolkit';
import searchDataReducer from '../slices/search';
import showvariablesReducer from '../slices/show'
import queryDataReducer from '../slices/query'
import authdatareducer from '../slices/auth'
export default configureStore({
  reducer: {
    searchdata:searchDataReducer,
    showvariables:showvariablesReducer,
    queryresponses:queryDataReducer,
    authdata:authdatareducer
  },

});