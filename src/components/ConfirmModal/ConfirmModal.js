import React from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";

const ConfirmModal = ({show, handle, products, id}) => {
    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch({type: "DELETE_PRODUCT", payload: products.filter(i => i.id !== id)})
        handle()
    }
    return (
        <Modal show={show}>
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>Confirm your action!</Modal.Body>
            <Modal.Footer>
                <Button onClick={handle} variant="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="success">
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;