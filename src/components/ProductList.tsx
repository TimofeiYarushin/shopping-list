import { Product } from '../types';

import ProductThumbnail from './ProductThumbnail';

type ProductListProps = {
	list: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ list }) => {
    const products = list.map((product, index) => (<ProductThumbnail product={product} productIndex={index} />));

	return (
		<div className="list-container">
            {products}
        </div>
	);
}

export default ProductList;
