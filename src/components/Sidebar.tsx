import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { Actions } from '../store/actions';
import SortingProducts from './SortingProducts';

const Sidebar: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<div className="sidebar-content d-grid gap-2">
			<Button variant="secondary" size="sm" onClick={() => dispatch(Actions.openDialog())}>Add product</Button>
			<SortingProducts />
		</div>
	);
}

export default Sidebar;
