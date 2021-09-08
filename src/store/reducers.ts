import { Reducer } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';
import update from 'immutability-helper';
import moment from 'moment';


import { Product, ProductsState } from '../types';

import { ActionTypes, Actions } from './actions';
import { MockProductsList } from './mockData';

const initProductsState: ProductsState = {
	productsList: [...MockProductsList],
	orderList: [],
	sorting: {
		sortBy: 'date',
		direction: 'desc'
	}
};

const sortBy: Reducer<ProductsState, ActionType<typeof Actions['sortBy']>> = (state = initProductsState, { payload: { sortBy, direction } }) => {
	type sortPredicat = (left: Product, right: Product) => number;

	const sortByDate: sortPredicat = (left, right) => moment.utc(left.createdDate).diff(moment.utc(right.createdDate));
	const sortByPriority: sortPredicat = (left, right) => left.priority - right.priority;

	const directionDelegate = (predicat: sortPredicat) => (left: Product, right: Product) => direction === 'asc' ? predicat(left, right) : predicat(right, left);
	const sorting = directionDelegate(sortBy === 'date' ? sortByDate : sortByPriority);

	return update(state, {
		productsList: { $set: [...state.productsList].sort(sorting) },
		orderList: { $set: [...state.orderList].sort(sorting) },
		sorting: { sortBy: { $set: sortBy }, direction: { $set: direction } }
	});
};

const createProduct: Reducer<ProductsState, ActionType<typeof Actions['createProduct']>> = (state = initProductsState, { payload: { name, unitsInStock, priority, createdDate } }) => {
	const newProduct: Product = {
		id: `${name}_${createdDate}`,
		name,
		priority,
		unitsInStock,
		createdDate,
		isSold: false,
	};
	const updState = update(state, { productsList: { $push: [newProduct] } });
	return sortBy(updState, Actions.sortBy(state.sorting.sortBy, state.sorting.direction));
};

const deleteProduct: Reducer<ProductsState, ActionType<typeof Actions['deleteProduct']>> = (state = initProductsState, action) => {
	const { productID } = action.payload;
	const productIndex = state.productsList.findIndex(item => item.id === productID);

	if (productIndex === -1) {
		console.warn(`${action.type}: invalid product ID`);
		return state;
	}
	return update(state, { productsList: { $splice: [[productIndex, 1]] } });
};

const addToOrder: Reducer<ProductsState, ActionType<typeof Actions['addToOrder']>> = (state = initProductsState, action) => {
	const { productID } = action.payload;
	const productIndex = state.productsList.findIndex(item => item.id === productID);

	if (productIndex === -1) {
		console.warn(`${action.type}: invalid product ID`);
		return state;
	}

	const updState = update(state, {
		productsList: { $splice: [[productIndex, 1]] },
		orderList: { $push: [state.productsList[productIndex]] }
	});
	return sortBy(updState, Actions.sortBy(state.sorting.sortBy, state.sorting.direction));
};

const removeFromOrder: Reducer<ProductsState, ActionType<typeof Actions['removeFromOrder']>> = (state = initProductsState, action) => {
	const { productID } = action.payload;
	const productIndex = state.orderList.findIndex(item => item.id === productID);

	if (productIndex === -1) {
		console.warn(`${action.type}: invalid product ID`);
		return state;
	}

	const updState = update(state, {
		orderList: { $splice: [[productIndex, 1]] },
		productsList: { $push: [state.orderList[productIndex]] }
	});
	return sortBy(updState, Actions.sortBy(state.sorting.sortBy, state.sorting.direction));
};

const applyAppState: Reducer<ProductsState, ActionType<typeof Actions['applyProductsState']>> = (_, { payload: { state: restoredState } }) => restoredState;

export const productsReducer = createReducer(initProductsState)
	.handleAction(ActionTypes.DELETE_PRODUCT, deleteProduct)
	.handleAction(ActionTypes.CREATE_PRODUCT, createProduct)
	.handleAction(ActionTypes.ADD_TO_ORDER, addToOrder)
	.handleAction(ActionTypes.REMOVE_FROM_ORDER, removeFromOrder)
	.handleAction(ActionTypes.SORT_BY, sortBy)
	.handleAction(ActionTypes.APPLY_APP_STATE, applyAppState);


export const modalDialogReducer = createReducer(false)
	.handleAction(ActionTypes.DIALOG_OPEN, () => true)
	.handleAction(ActionTypes.DIALOG_CLOSE, () => false);
