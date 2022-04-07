import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {Modal} from 'react-bootstrap'

export const ModalUpdate = ({showModal, setShowModal, currentTask, updateCard}) => {
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [taskName, setTaskName] = useState('')

    const handleChange = (e) => {
        setTaskName(e.target.value)
    }

    const handleSave = (e) => {
        updateCard(currentTask.id, taskName)
        handleClose()
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update task: {currentTask.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Enter task:</Form.Label>
                        <Form.Control type="text" placeholder={currentTask.name} value={taskName} onChange={handleChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
