import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from "./userReducer";
import { gameReducer } from "./gameReducer";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { canvasReducer } from './canvasReducer';
import { toolReducer } from "./toolReducer";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  canvas: canvasReducer,
  tool: toolReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
