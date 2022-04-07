import Form from 'react-bootstrap/Form'
import {Button, Col, Row} from "react-bootstrap";
import {useState} from "react";
import {MAX_PRIORITY, MIN_PRIORITY} from "./const";


export const InputCard = (props) => {
    const [data, setData] = useState({status: 'todo', priority: MIN_PRIORITY})
    const {createCard, statuses} = props

    const priorities = Array.from({length: MAX_PRIORITY}, (_, i) => i + MIN_PRIORITY)

    const handleChange = (e) => {
        const value = e.target.value
        setData({...data, [e.target.name]: value})
    }

    const onSubmitHandle = (e) => {
        e.preventDefault()
        createCard(data)
    }

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" htmlFor="inputText">Input text:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10"
                                  type="text"
                                  id="inputText"
                                  name="name"
                                  value={data.name}
                                  onChange={handleChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" htmlFor="inputPriority">Input priority:</Form.Label>
                <Col sm="10">
                    <Form.Select onChange={handleChange} name='priority'>
                        {priorities.map(priority => {
                            return <option value={+priority}>{priority}</option>
                        })}
                    </Form.Select>
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onSubmitHandle}>
                Add Card
            </Button>
        </Form>
    )
}