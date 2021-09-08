import { action } from 'typesafe-actions';

import { ProductPriority, SortBy, Direction, ProductsState } from '../types';

export const ActionTypes = {
	RESTORE_APP_STATE: '@store/RESTORE_APP_STATE',
	APPLY_APP_STATE: '@store/APPLY_APP_STATE',
	DELETE_PRODUCT: '@strore/DELETE_PRODUCT',
	CREATE_PRODUCT: '@strore/CREATE_PRODUCT',
	ADD_TO_ORDER: '@strore/ADD_TO_ORDER',
	REMOVE_FROM_ORDER: '@strore/REMOVE_FROM_ORDER',
	SORT_BY: '@strore/SORT_BY',
	DIALOG_OPEN: '@modal_dialog/DIALOG_OPEN',
	DIALOG_CLOSE: '@modal_dialog/DIALOG_CLOSE',
};

export const restoreAppState = () => action(ActionTypes.RESTORE_APP_STATE, {});
export const applyProductsState = (state: ProductsState) => action(ActionTypes.APPLY_APP_STATE, { state });
export const deleteProduct = (productID: string) => action(ActionTypes.DELETE_PRODUCT, { productID });
export const createProduct = (name: string, unitsInStock: number, priority: ProductPriority, createdDate: string) =>
	action(ActionTypes.CREATE_PRODUCT, { name, unitsInStock, priority, createdDate });
export const addToOrder = (productID: string) => action(ActionTypes.ADD_TO_ORDER, { productID });
export const removeFromOrder = (productID: string) => action(ActionTypes.REMOVE_FROM_ORDER, { productID });
export const sortBy = (sortBy: SortBy, direction: Direction = 'desc') => action(ActionTypes.SORT_BY, { sortBy, direction });
export const openDialog = () => action(ActionTypes.DIALOG_OPEN, {});
export const closeDialog = () => action(ActionTypes.DIALOG_CLOSE, {});

export const Actions = {
	restoreAppState,
	applyProductsState,
	deleteProduct,
	createProduct,
	addToOrder,
	removeFromOrder,
	sortBy,
	openDialog,
	closeDialog
}
