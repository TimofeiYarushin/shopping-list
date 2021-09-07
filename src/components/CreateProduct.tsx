import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import moment from "moment";

import { ProductPriority } from '../types'
import { Actions } from '../store/actions';
import { modalDialog } from './ModalDialog';
import { priorityLabels } from './componentHelpers'

type CreateProductProps = {
	closeDialog: () => void;
};
const CreateProduct: React.FC<CreateProductProps> = ({ closeDialog }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [count, setCount] = useState(0);
	const [priority, setPriority] = useState(ProductPriority.Low);

	const createProduct = () => {
		const createDate = moment().format();
		dispatch(Actions.createProduct(name, count, priority, createDate));
		closeDialog();
	}

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Create Product</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="create-new">
					<Form.Label>Name</Form.Label>
					<InputGroup className="mb-3" size="sm">
						<FormControl onChange={(e) => setName(e.currentTarget.value)} />
					</InputGroup>
					<Form.Label>Units in stock</Form.Label>
					<InputGroup className="mb-3" size="sm">
						<FormControl type="number" onChange={(e) => setCount(Number(e.currentTarget.value))} />
					</InputGroup>
					<Form.Label>Priority</Form.Label>
					<InputGroup className="mb-3" >
						<Dropdown>
							<Dropdown.Toggle variant="outline-secondary">{priorityLabels[priority]}</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item sele onClick={() => setPriority(ProductPriority.Low)}>Low</Dropdown.Item>
								<Dropdown.Item onClick={() => setPriority(ProductPriority.Medium)}>Medium</Dropdown.Item>
								<Dropdown.Item onClick={() => setPriority(ProductPriority.High)}>High</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</InputGroup>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeDialog}>Close</Button>
				<Button variant="primary" onClick={createProduct}>Save</Button>
			</Modal.Footer>
		</>
	);
}

export const CreateProductModalDialog = modalDialog(CreateProduct);

export default CreateProduct;
