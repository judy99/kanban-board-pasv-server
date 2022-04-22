import 'bootstrap/dist/css/bootstrap.min.css'
import {v4 as uuidv4} from 'uuid'
import './App.css';
import {useEffect, useState} from "react";
import {MAX_PRIORITY, MIN_PRIORITY, BASE_URL, initialStatuses} from "./const";
import {Column} from "./Column";
import axios from "axios";
import {CreateTaskModal} from "./CreateTaskModal";
import {Spinner} from "react-bootstrap";

function App() {
    // const [statuses, setStatuses] = useState([{id: uuidv4(), status: 'todo'},
    //     {id: uuidv4(), status: 'progress'}, {id: uuidv4(), status:'review'}, {id: uuidv4(), status: 'done'}])

    const [tasks, setTasks] = useState([])
    // const statusesArr = statuses.map(status => status.status)
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [currentTask, setCurrentTask] = useState({})
    const [loader, setLoader] = useState(false)

    const statuses = ['todo', 'progress', 'review', 'done']
    const priorities = Array.from({length: MAX_PRIORITY}, (_, i) => i + MIN_PRIORITY)

    const getCards = () => {
        setLoader(true)
        axios({
            method: 'GET',
            url: `${BASE_URL}/cards`
        }).then(res => {
            setTasks(res.data)
            setLoader(false)
        })
            .catch(err => console.log(err))
    }

    const createCard = (data) => {
        const {title, description, priority, status} = data
        const newCard = {
            'title': title,
            'description': description || '',
            'status': status || statuses[0],
            'priority': Number(priority) || 1
        }
        axios.post(`${BASE_URL}/cards`, newCard)
            .then(() => {
                getCards()
            })
            .catch(err => console.log(err));
    }



    const increasePriority = (task) => {
        // const updatedTasks = tasks.map(task => {
        //     return (task.id === id) ? {...task, priority: (+task.priority >= MAX_PRIORITY) ? MAX_PRIORITY : +task.priority + 1}: task
        // })
        // const updatedTask = updatedTasks.find(task => task.id === id)
        // axios({
        //     method: 'PATCH',
        //     url: `${BASE_URL}/cards/${id}`,
        //     data: updatedTask
        // }).then(() => setTasks(updatedTasks));
        const currentPriority = task.priority
        const newPriority = (currentPriority >= MIN_PRIORITY && currentPriority < MAX_PRIORITY ) ? currentPriority + 1 : null
        updateCard({...task, priority: newPriority || task.priority})
    }

    const decreasePriority = (task) => {
        // const updatedTasks = tasks.map(task => {
        //     return (task.id === id) ? {...task, priority: (task.priority <= MIN_PRIORITY) ? MIN_PRIORITY :  task.priority - 1}: task
        // })
        // const updatedTask = updatedTasks.find(task => task.id === id)
        // axios({
        //     method: 'PATCH',
        //     url: `${BASE_URL}/cards/${id}`,
        //     data: updatedTask
        // }).then(() => setTasks(updatedTasks));
        const currentPriority = task.priority
        const newPriority = (currentPriority > MIN_PRIORITY && currentPriority <= MAX_PRIORITY ) ? currentPriority - 1 : null
        updateCard({...task, priority: newPriority || task.priority})
    }

    const  updateCard = (updTask) => {
        console.log('updTask', updTask)
        axios.patch(`${BASE_URL}/cards/${updTask._id}`, updTask)
            .then(() => getCards())
            .catch(err => console.log(err));
    }

    const removeCard = (id) => {
        axios({
            method: 'DELETE',
            url: `${BASE_URL}/cards/${id}`,
        }).then(() => getCards())
            .catch(err => console.log('err while removing...' + err));
    }

    const moveCardRight = (task) => {
        const currentStatusIndex = statuses.indexOf(task.status)
        const nextStatus = (currentStatusIndex !== statuses.length - 1) ? statuses[currentStatusIndex + 1] : null
        updateCard({...task, status: nextStatus || task.status})
    }

    // const getTaskById = (id) => {
    //     const t = tasks.find(item => item.id === id)
    //     console.log('current task ', t)
    //     setCurrentTask(t)
    // }

    const moveCardLeft = (task) => {
        const currentStatusIndex = statuses.indexOf(task.status)
        const prevStatus = (currentStatusIndex !== 0) ? statuses[currentStatusIndex - 1] : null
        updateCard({...task, status: prevStatus || task.status})
    }

    useEffect(() => {
        getCards()
    }, [])

    return (
        <div className="App container">
            <h1>Kanban Board</h1>

            <CreateTaskModal createCard={createCard} statuses={statuses} priorities={priorities}/>

            {loader && <div>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>
            }
            <div className="row align-items-start">
            {statuses.map((status, index) => {
                return <Column key={status[index]} status={status} tasks={tasks}
                               moveCardLeft={moveCardLeft}
                               moveCardRight={moveCardRight}
                               lastCol={index === statuses.length - 1} firstCol={index === 0}
                               decreasePriority={decreasePriority} increasePriority={increasePriority}
                               removeCard={removeCard} updateCard={updateCard}
                               setShowModal={setShowModal} setShowModalDelete={setShowModalDelete}
                               // getTaskById={getTaskById}
                               statuses={statuses} priorities={priorities}
                               />
            })}
            </div>
        </div>
    );
}

export default App;
