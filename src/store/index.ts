import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { productsReducer, modalDialogReducer } from './reducers'
import { saga } from './sagas'

const sagaMiddleware = createSagaMiddleware();
export default configureStore({
	reducer: combineReducers({ products: productsReducer, showingCreateProductModalDialog: modalDialogReducer }),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(saga);