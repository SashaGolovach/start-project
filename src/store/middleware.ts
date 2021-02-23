import { Middleware } from 'redux';
import thunk from 'redux-thunk';
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';

const DEVELOPMENT_MODE = 'development';

const createMiddleware = (history: History): Middleware[] => {
  const middleware = [thunk.withExtraArgument(history), routerMiddleware(history)];

  if (process.env.NODE_ENV === DEVELOPMENT_MODE) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    middleware.push(require('redux-logger').createLogger({ collapsed: true }));
  }

  return middleware;
};

export default createMiddleware;
