import { createStore, compose } from "redux";

import CombinedReducers from "./reducers";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const appliedMiddleware = devTools ? compose(devTools) : compose();

const store = createStore(CombinedReducers, appliedMiddleware);

export default store;
