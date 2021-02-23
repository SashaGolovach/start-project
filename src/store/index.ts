import { History } from 'history';
import { createStore } from 'redux';
import { applyMiddleware, composeEnhancers } from './integra-ts-redux';

import reducers from './reducers';
import createMiddleware from './middleware';
import { initialState } from './initialState';
import { TCGP } from './types';

interface IStoreParams {
  history: History;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function store({ history }: IStoreParams) {
  // Build the middleware for intercepting and dispatching navigation actions
  const middleware = createMiddleware(history);

  const enhancer = composeEnhancers<TCGP>(applyMiddleware(...middleware));
  return createStore(reducers, initialState, enhancer);
}
