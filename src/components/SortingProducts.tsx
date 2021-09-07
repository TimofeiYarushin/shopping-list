import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';

import { SortBy, Direction, ApplicationState } from '../types';
import { Actions } from '../store/actions';

const SortingProducts: React.FC = () => {
	const dispatch = useDispatch();
	const { sortBy, direction } = useSelector((state: ApplicationState) => state.products.sorting);

	const defaultSorting = useCallback(() => { dispatch(Actions.sortBy('date', 'desc')) }, [dispatch]);
	useEffect(() => { defaultSorting() }, [defaultSorting]);

	const setSorting = (sortBy: SortBy, direction: Direction) => () => dispatch(Actions.sortBy(sortBy, direction));

	const sortByLabel = sortBy === 'date' ? 'Date' : 'Priority';
	const directionLabel = direction === 'desc' ? 'Descending' : 'Ascending';
	const sortLabel = `${sortByLabel} ${directionLabel}`

	return (
		<Dropdown>
			<Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">{sortLabel}</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item onClick={setSorting('date', 'asc')}>Date Ascending</Dropdown.Item>
				<Dropdown.Item onClick={setSorting('date', 'desc')}>Date Descending</Dropdown.Item>
				<Dropdown.Item onClick={setSorting('priority', 'asc')}>Priority Ascending</Dropdown.Item>
				<Dropdown.Item onClick={setSorting('priority', 'desc')}>Priority Descending</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default SortingProducts;
