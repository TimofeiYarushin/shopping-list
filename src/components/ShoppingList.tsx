import React from 'react';

import { Product } from '../types';

import { ProductThumbnail } from './ProductThumbnail';

type ShoppingListProps = {
	productList: Product[];
	orderList: Product[];
};

export const ShoppingList: React.FC<ShoppingListProps> = ({ productList, orderList }) => {
	return (
		<div className="list-container">
			{productList.map((product) => (<ProductThumbnail key={product.id} product={product} />))}
			{orderList.map((product) => (<ProductThumbnail key={product.id} product={product} inOrder />))}
		</div>
	);
}
