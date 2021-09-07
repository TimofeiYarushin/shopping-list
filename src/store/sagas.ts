import { takeEvery, fork, delay, select, put } from 'redux-saga/effects'
import { Actions, ActionTypes } from './actions';
import { ApplicationState, ProductsState } from '../types';

const key = 'productsState';
const storage = sessionStorage;

function* persist() {
	while (true) {
		yield delay(1000);

		const state: ProductsState = yield select((state: ApplicationState) => state.products);
		if (!state) return;

		storage.setItem(key, JSON.stringify(state));
	}
}

function* restore() {
	if (!storage.length) return;
	const appStateJson = storage.getItem(key);
	if (!appStateJson) return null;

	yield put(Actions.applyProductsState(JSON.parse(appStateJson)));
}

export function* saga() {
	if (!storage) return;

	yield takeEvery(ActionTypes.RESTORE_APP_STATE, restore);
	yield fork(persist);
}
