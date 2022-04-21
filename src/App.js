import 'bootstrap/dist/css/bootstrap.min.css'
import {v4 as uuidv4} from 'uuid'
import './App.css';
import {useEffect, useState} from "react";
import {MAX_PRIORITY, MIN_PRIORITY, BASE_URL, initialStatuses} from "./const";
import {Column} from "./Column";
import axios from "axios";
import {CreateTaskModal} from "./CreateTaskModal";

function App() {
    const [statuses, setStatuses] = useState([{id: uuidv4(), status: 'todo'},
        {id: uuidv4(), status: 'progress'}, {id: uuidv4(), status:'review'}, {id: uuidv4(), status: 'done'}])
    const [tasks, setTasks] = useState([])
    const statusesArr = statuses.map(status => status.status)
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [currentTask, setCurrentTask] = useState({})

    const priorities = Array.from({length: MAX_PRIORITY}, (_, i) => i + MIN_PRIORITY)

    const getCards = () => {
        console.log('loading...')
        axios({
            method: 'GET',
            url: `${BASE_URL}/cards`
        }).then(res => setTasks(res.data))
    }

    const createCard = (data) => {
        const {title, description, priority, status} = data
        const newCard = {
            'title': title,
            'description': description || '',
            'status': status || statuses[0].status,
            'priority': Number(priority) || 1
        }
        axios.post(`${BASE_URL}/cards`, newCard)
            .then((res) => {
                getCards()
            })
            .catch(err => console.log(err));
    }

    const moveCardLeft = (id) => {
        const updatedTasks = tasks.map(el => {
            return (id === el.id) ? {...el, status: statusesArr[statusesArr.indexOf(el.status) - 1] } : el
        })
        const updatedTask = updatedTasks.find(task => task.id === id)
        axios({
            method: 'PATCH',
            url: `${BASE_URL}/cards/${id}`,
            data: updatedTask
        }).then(() => setTasks(updatedTasks));
    }

    const moveCardRight = (id) => {
        const updatedTasks = tasks.map(el => {
            return (id === el.id) ? {...el, status: statusesArr[statusesArr.indexOf(el.status) + 1] } : el
        })
        const updatedTask = updatedTasks.find(task => task.id === id)
        axios({
            method: 'PATCH',
            url: `${BASE_URL}/cards/${id}`,
            data: updatedTask
        }).then(() => setTasks(updatedTasks));
    }

    const increasePriority = (id) => {
        const updatedTasks = tasks.map(task => {
            return (task.id === id) ? {...task, priority: (+task.priority >= MAX_PRIORITY) ? MAX_PRIORITY : +task.priority + 1}: task
        })
        const updatedTask = updatedTasks.find(task => task.id === id)
        axios({
            method: 'PATCH',
            url: `${BASE_URL}/cards/${id}`,
            data: updatedTask
        }).then(() => setTasks(updatedTasks));
    }

    const decreasePriority = (id) => {
        const updatedTasks = tasks.map(task => {
            return (task.id === id) ? {...task, priority: (task.priority <= MIN_PRIORITY) ? MIN_PRIORITY :  task.priority - 1}: task
        })
        const updatedTask = updatedTasks.find(task => task.id === id)
        axios({
            method: 'PATCH',
            url: `${BASE_URL}/cards/${id}`,
            data: updatedTask
        }).then(() => setTasks(updatedTasks));
    }

    const removeCard = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id)
        axios({
            method: 'DELETE',
            url: `${BASE_URL}/cards/${id}`,
        }).then((response) => {
            console.log('status: ', response.status)
            setTasks(updatedTasks)
        });
    }

    const  updateCard = (updTask) => {
        const updatedTasks = tasks.map(task => {
            return (task.id === updTask.id) ? {...task, ...updTask} : task
        })
        const updatedTask = updatedTasks.find(task => task.id === updTask.id)
        axios({
            method: 'PATCH',
            url: `${BASE_URL}/cards/${updTask.id}`,
            data: updatedTask
        }).then(() => setTasks(updatedTasks));
    }

    const getTaskById = (id) => {
        const t = tasks.find(item => item.id === id)
        console.log('current task ', t)
        setCurrentTask(t)
    }

    useEffect(() => {
        getCards()
    }, [])

    return (
        <div className="App container">
            <h1>Kanban Board</h1>

            <CreateTaskModal createCard={createCard} statuses={statuses} priorities={priorities}/>

            <div className="row align-items-start">
            {statuses.map((status, index) => {
                return <Column key={status.id} status={status} tasks={tasks}
                               moveCardLeft={moveCardLeft} moveCardRight={moveCardRight}
                               lastCol={index === statuses.length - 1} firstCol={index === 0}
                               decreasePriority={decreasePriority} increasePriority={increasePriority}
                               removeCard={removeCard} updateCard={updateCard}
                               setShowModal={setShowModal} setShowModalDelete={setShowModalDelete}
                               getTaskById={getTaskById}
                               statuses={statuses} priorities={priorities}
                               />
            })}
            </div>
        </div>
    );
}

export default App;
