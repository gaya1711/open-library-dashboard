import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // You might also use other middleware like thunk

// Import your root reducer
import rootReducer from './reducers'; // Assuming you have a 'reducers' folder with a root reducer

// Create the Redux store with middleware applied
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
