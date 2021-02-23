import { ThunkAction } from "redux-thunk";
import { Reducer } from 'redux';
import { MakeTAction, MakeTActionType, MakeTCGP, MakeTDispatch } from "./integra-ts-rexux";
import * as actions from './actions';


export interface IStoreState {
}

export type TCGP = MakeTCGP<IStoreState, Record<string, unknown>, typeof actions>;
export type TActionType = MakeTActionType<TCGP>;
export type TAction = MakeTAction<TCGP>;
export type TThunk<R, E = null> = ThunkAction<R, IStoreState, E, TAction>;
export type TDispatch = MakeTDispatch<TCGP>;
export type TReducer<T> = Reducer<T, TAction>;