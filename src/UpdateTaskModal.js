import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {Modal} from 'react-bootstrap'

export const UpdateTaskModal = ({task, updateCard, statuses, priorities}) => {
    const {id, name, status, priority} = task

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [taskToUpdate, setTaskToUpdate] = useState({...task})

    const handleChange = (e) => {
        setTaskToUpdate({...taskToUpdate, [e.target.name]: e.target.value})
    }

    const handleSave = (e) => {
        updateCard(taskToUpdate)
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update task: {taskToUpdate.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Enter task:</Form.Label>
                            <Form.Control type="text" name='name' value={taskToUpdate.name} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2" htmlFor="inputPriority">Edit priority:</Form.Label>
                            <Col sm="10">
                                <Form.Select onChange={handleChange} name='priority' defaultValue={priority} >

                                {priorities.map((priority, index) => {
                                        return <option key={index} value={+priority}>{priority}</option>
                                    })}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2" htmlFor="inputStatuses">Edit status:</Form.Label>
                            <Col sm="10">
                                <Form.Select onChange={handleChange} name='status' defaultValue={status}>
                                    {statuses.map(status => {
                                        return <option key={status.id} value={status.status}>{status.status}</option>
                                    })}
                                </Form.Select>
                            </Col>
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
        </>

    )
}
