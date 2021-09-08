import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { ApplicationState } from '../types';
import { Actions } from '../store/actions';

type ModalDialogProps<P> = Omit<P, 'closeDialog'>;
export const modalDialog = <P extends Record<string, any>>(Editor: React.ComponentType<P>) => (props: ModalDialogProps<P>) => {
	const dispatch = useDispatch();
	const isShowing = useSelector((state: ApplicationState) => state.showingCreateProductModalDialog);
	const closeDialog = () => dispatch(Actions.closeDialog());

	return (
		<Modal show={isShowing} onHide={closeDialog}>
			<Editor {...props as P} closeDialog={closeDialog} />
		</Modal>
	);
};
