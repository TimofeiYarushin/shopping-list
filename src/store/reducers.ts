import { Reducer } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';
import update from 'immutability-helper';
import moment from "moment";


import { ProductPriority, Product, ProductsState } from '../types';
import { ActionTypes, Actions } from './actions';

//#region init state with mockup data
const initState: ProductsState = {
	productsList: [
		{
			id: 'Product 1',
			name: 'Product 1',
			priority: ProductPriority.Medium,
			unitsInStock: 20,
			isSold: false,
			createdDate: '2019-01-07T13:33:45+07:00'
		},
		{
			id: 'Product 2',
			name: 'Product 2',
			priority: ProductPriority.Low,
			unitsInStock: 10,
			isSold: false,
			createdDate: '2019-06-07T13:43:45+07:00'
		},
		{
			id: 'Product 3',
			name: 'Product 3',
			priority: ProductPriority.High,
			unitsInStock: 30,
			isSold: false,
			createdDate: '2020-01-09T13:43:45+07:00'
		},
		{
			id: 'Product 4',
			name: 'Product 4',
			priority: ProductPriority.Low,
			unitsInStock: 60,
			isSold: false,
			createdDate: '2021-09-07T13:13:45+07:00'
		},
		{
			id: 'Product 5',
			name: 'Product 5',
			priority: ProductPriority.Low,
			unitsInStock: 71,
			isSold: false,
			createdDate: '2021-09-07T13:23:45+07:00'
		},
		{
			id: 'Product 6',
			name: 'Product 6',
			priority: ProductPriority.High,
			unitsInStock: 70,
			isSold: false,
			createdDate: '2021-09-07T13:33:45+07:00'
		},
		{
			id: 'Product 7',
			name: 'Product 7',
			priority: ProductPriority.Low,
			unitsInStock: 410,
			isSold: false,
			createdDate: '2021-09-07T13:43:45+07:00'
		},
		{
			id: 'Product 8',
			name: 'Product 8',
			priority: ProductPriority.Medium,
			unitsInStock: 78,
			isSold: false,
			createdDate: '2021-09-07T13:43:50+07:00'
		},
	],
	orderList: [],
	sorting: {
		sortBy: 'date',
		direction: 'desc'
	}
};
//#endregion

const sortBy: Reducer<ProductsState, ActionType<typeof Actions['sortBy']>> = (state = initState, { payload: { sortBy, direction } }) => {
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

const createProduct: Reducer<ProductsState, ActionType<typeof Actions['createProduct']>> = (state = initState, { payload: { name, unitsInStock, priority, createdDate } }) => {
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

const deleteProduct: Reducer<ProductsState, ActionType<typeof Actions['deleteProduct']>> = (state = initState, action) => {
	const { productID } = action.payload;
	const productIndex = state.productsList.findIndex(item => item.id === productID);

	if (productIndex === -1) {
		console.warn(`${action.type}: invalid product ID`);
		return state;
	}
	return update(state, { productsList: { $splice: [[productIndex, 1]] } });
};

const addToOrder: Reducer<ProductsState, ActionType<typeof Actions['addToOrder']>> = (state = initState, action) => {
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

const removeFromOrder: Reducer<ProductsState, ActionType<typeof Actions['removeFromOrder']>> = (state = initState, action) => {
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

const applyAppState: Reducer<ProductsState, ActionType<typeof Actions['applyProductsState']>> = (state = initState, { payload: { state: restoredState} }) => restoredState;

export const productsReducer = createReducer(initState)
  .handleAction(ActionTypes.DELETE_PRODUCT, deleteProduct)
  .handleAction(ActionTypes.CREATE_PRODUCT, createProduct)
  .handleAction(ActionTypes.ADD_TO_ORDER, addToOrder)
  .handleAction(ActionTypes.REMOVE_FROM_ORDER, removeFromOrder)
  .handleAction(ActionTypes.SORT_BY, sortBy)
  .handleAction(ActionTypes.APPLY_APP_STATE, applyAppState);


export const modalDialogReducer = createReducer(false)
  .handleAction(ActionTypes.DIALOG_OPEN, (state: boolean) => {
	  return true
	})
  .handleAction(ActionTypes.DIALOG_CLOSE, (state: boolean) => false);
