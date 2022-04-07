import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {Modal} from 'react-bootstrap'

export const ModalDelete = ({showModalDelete, setShowModalDelete, currentTask, removeCard}) => {
    const handleClose = () => setShowModalDelete(false);
    const handleShow = () => setShowModalDelete(true);

    const handleSave = (e) => {
        removeCard(currentTask.id)
        handleClose()
    }

    return (
        <Modal show={showModalDelete} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Are you sure you want to delete card with text:</Form.Label><br />
                        <Form.Text>{currentTask.name}</Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
