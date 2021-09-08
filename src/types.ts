export enum ProductPriority {
	Low = 0,
	Medium,
	High
}

export type Product = {
	id: string;
	name: string;
	unitsInStock: number;
	priority: ProductPriority;
	isSold: boolean;
	createdDate: string;
};

export type SortBy = 'date' | 'priority';
export type Direction = 'asc' | 'desc';

export type Sorting = {
	sortBy: SortBy,
	direction: Direction;
};

export type ProductsState = {
	productsList: Product[];
	orderList: Product[];
	sorting: Sorting;
};

export type ApplicationState = {
	products: ProductsState;
	showingCreateProductModalDialog: boolean;
};