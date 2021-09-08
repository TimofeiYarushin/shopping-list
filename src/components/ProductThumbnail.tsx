import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { Actions } from '../store/actions';
import { Product } from '../types';

import { priorityLabels } from './componentHelpers';


type ProductListProps = {
	product: Product;
	inOrder?: boolean;
};

export const ProductThumbnail: React.FC<ProductListProps> = ({ product, inOrder }) => {
	const dispatch = useDispatch();

	const deleteProduct = () => dispatch(Actions.deleteProduct(product.id));
	const addToOrder = () => dispatch(Actions.addToOrder(product.id));
	const removeFromOrder = () => dispatch(Actions.removeFromOrder(product.id));
	const changeProductList = inOrder ? removeFromOrder : addToOrder;

	return (
		<div className="product-container">
			<h6>{product.name}</h6>
			<div>
				<span>Product priority: {priorityLabels[product.priority]}</span>
			</div>
			<div>
				<span>Units in stock: {product.unitsInStock}</span>
			</div>
			<div>
				<span>Status: {`${inOrder ? 'Sold' : 'New'}`}</span>
			</div>
			<div>
				<span>Created date: {`${moment(product.createdDate).format('DD-MM-YYYY HH:mm:ss')}`}</span>
			</div>
			<div>
				<span>In cart: </span>
				<input type="checkbox" checked={inOrder} onChange={changeProductList} />
			</div>
			{!inOrder && <div className="delete-button" onClick={deleteProduct}>
				<i className="bi bi-x"></i>
			</div>}
		</div>
	);
}
