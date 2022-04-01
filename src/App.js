import 'bootstrap/dist/css/bootstrap.min.css'
import {v4 as uuidv4} from 'uuid'
import './App.css';
import {useState} from "react";
import {MAX_PRIORITY, MIN_PRIORITY} from "./const";
import {Column} from "./Column";

const initialStatuses = [
    {
        id: uuidv4(),
        status: 'todo'
    },
    {
        id: uuidv4(),
        status: 'in progress'
    },
    {
        id: uuidv4(),
        status: 'review'
    },
    {
        id: uuidv4(),
        status: 'done'
    },

]

const initialTasks = [
    {
        id: uuidv4(),
        name: 'Learn React vbuhvueh',
        description: 'text text text lorem ipsum ',
        priority: 2,
        status: 'todo'
    },
    {
        id: uuidv4(),
        name: 'Learn React dsbvksbkjb',
        description: 'text text text lorem ipsum ',
        priority: 5,
        status: 'in progress'
    },
    {
        id: uuidv4(),
        name: 'Learn Reactdjvnfkjfdnb',
        description: 'text text text lorem ipsum ',
        priority: 1,
        status: 'done'
    },
    {
        id: uuidv4(),
        name: 'Learn React1234',
        description: 'text text text lorem ipsum ',
        priority: 3,
        status: 'review'
    },
    {
        id: uuidv4(),
        name: 'Learn React1234',
        description: 'text text text lorem ipsum ',
        priority: 3,
        status: 'review'
    },


]
function App() {
    const [statuses, setStatuses] = useState(initialStatuses)
    const [tasks, setTasks] = useState(initialTasks)

    const statusesArr = statuses.map(status => status.status)
    console.log('statusesArr ', statusesArr)

    const moveCardLeft = (id) => {
        const updatedTask = tasks.map(el => {
            return (id === el.id) ? {...el, status: statusesArr[statusesArr.indexOf(el.status) - 1] } : el
        })
        setTasks(updatedTask)
    }

    const moveCardRight = (id) => {
        const updatedTask = tasks.map(el => {
            return (id === el.id) ? {...el, status: statusesArr[statusesArr.indexOf(el.status) + 1] } : el
        })
        console.log('updatedTask', updatedTask)
        setTasks(updatedTask)
    }

    const increasePriority = (id) => {
        const updatedTask = tasks.map(task => {
            return (task.id === id) ? {...task, priority: (task.priority >= MAX_PRIORITY) ? MAX_PRIORITY : task.priority + 1}: task
        })
        setTasks(updatedTask)
    }

    const decreasePriority = (id) => {
        const updatedTask = tasks.map(task => {
            return (task.id === id) ? {...task, priority: (task.priority <= MIN_PRIORITY) ? MIN_PRIORITY :  task.priority - 1}: task
        })
        setTasks(updatedTask)
    }

    return (
        <div className="App container">
            <h1>Kanban Board</h1>
            <div className="row align-items-start">
            {statuses.map((status, index) => {
                return <Column status={status} tasks={tasks} moveCardLeft={moveCardLeft} moveCardRight={moveCardRight}
                               lastCol={index === statuses.length - 1} firstCol={index === 0}
                               decreasePriority={decreasePriority} increasePriority={increasePriority}/>
            })}
            </div>

        </div>
    );
}

export default App;
