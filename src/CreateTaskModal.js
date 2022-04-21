import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";

export const CreateTaskModal = (props) => {
    const {createCard, statuses, priorities} = props
    const [show, setShow] = useState(false);
    const [data, setData] = useState({title: '', status: 'todo', description: '',  priority: 1})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreate = () => {
        console.log('data in handleCreate', data )
        createCard(data)
        handleClose()
    }

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2" htmlFor="inputText">Input text:</Form.Label>
                            <Col sm="10">
                                <Form.Control sm="10"
                                              type="text"
                                              id="inputText"
                                              name="title"
                                              value={data.title}
                                              onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2" htmlFor="inputPriority">Input priority:</Form.Label>
                            <Col sm="10">
                                <Form.Select onChange={handleChange} name='priority'>
                                    {priorities.map((priority, index) => {
                                        return <option key={index} value={+priority}>{priority}</option>
                                    })}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2" htmlFor="inputStatuses">Input status:</Form.Label>
                            <Col sm="10">
                                <Form.Select onChange={handleChange} name='status'>
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
                    <Button variant="primary" onClick={handleCreate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}