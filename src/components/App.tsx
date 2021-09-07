import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '../store/actions';
import { ApplicationState } from '../types';

import ShoppingList from './ShoppingList';
import Sidebar from './Sidebar';
import { CreateProductModalDialog } from './CreateProduct';


const App: React.FC = () => {
	const dispatch = useDispatch();

	const restoreProductsList = useCallback(() => { dispatch(Actions.restoreAppState()) }, [dispatch]);
	useEffect(() => { restoreProductsList() }, [restoreProductsList]);

	const { productsList, orderList } = useSelector((state: ApplicationState) => state.products);

	return (
		<>
			<div className="main">
				<ShoppingList productList={productsList} orderList={orderList} />
			</div>
			<div className="sidebar">
				<Sidebar />
			</div>
			<CreateProductModalDialog />
		</>
	);
}

export default App;
