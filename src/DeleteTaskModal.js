import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {Modal} from 'react-bootstrap'

export const DeleteTaskModal = ({task, removeCard}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = (e) => {
        removeCard(task._id)
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Are you sure you want to delete card with text:</Form.Label><br/>
                            <Form.Text>{task.title}</Form.Text>
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
        </>

    )
}
