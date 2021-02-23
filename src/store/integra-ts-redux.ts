import {
  Action,
  ActionCreatorsMapObject,
  AnyAction,
  applyMiddleware as initialApplyMiddleware,
  createStore as initialCreateStore,
  Middleware,
  MiddlewareAPI,
  Reducer,
  Store,
  StoreEnhancer,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ThunkDispatch } from 'redux-thunk';

type FunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never;
}[keyof T];

// typeof import * from actions
type TImportedActions = ActionCreatorsMapObject<Action<string>>;

// common generic params
type TCGP = {
  storeState: object;
  extraArgs: object;
  importedActions: TImportedActions;
};

export type MakeTCGP<
  SS extends TCGP['storeState'],
  EA extends TCGP['extraArgs'],
  IA extends TCGP['importedActions']
> = {
  storeState: SS;
  extraArgs: EA;
  importedActions: IA;
};

export type MakeTAction<CGP extends TCGP> = ReturnType<
  FunctionProperties<CGP['importedActions']>
>;

export type MakeTActionType<CGP extends TCGP> = MakeTAction<CGP>['type'];

export type MakeTDispatch<CGP extends TCGP> = ThunkDispatch<
  CGP['storeState'],
  CGP['extraArgs'],
  MakeTAction<CGP>
>;

type MakeStoreEnhancer<CGP extends TCGP> = StoreEnhancer<
  { dispatch: MakeTDispatch<CGP> },
  {}
>;

export type MakeTMiddlewareApi<CGP extends TCGP> = MiddlewareAPI<
  MakeTDispatch<{
    storeState: CGP['storeState'];
    extraArgs: CGP['extraArgs'];
    importedActions: AnyAction;
  }>,
  CGP['storeState']
>;

export const composeEnhancers: <CGP extends TCGP>(
  ...funcs: MakeStoreEnhancer<CGP>[]
) => MakeStoreEnhancer<CGP> = composeWithDevTools;

export const applyMiddleware: <CGP extends TCGP>(
  ...middlewares: Middleware<any, CGP['storeState'], MakeTDispatch<CGP>>[]
) => MakeStoreEnhancer<CGP> = initialApplyMiddleware;

export const createStore: <CGP extends TCGP>(
  reducers: Reducer<CGP['storeState'], MakeTAction<CGP>>,
  initialState: CGP['storeState'],
  enhancer?: StoreEnhancer<{ dispatch: MakeTDispatch<CGP> }, {}>
) => Store<
  CGP['storeState'] & StoreEnhancer<{ dispatch: MakeTDispatch<CGP> }>,
  MakeTAction<CGP>
> = initialCreateStore as any;

export type MakeTUseSelector<SS extends object> = <TSelected>(
  selector: (state: SS) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

export type MakeTUseDispatch<CGP extends TCGP> = () => MakeTDispatch<CGP>;