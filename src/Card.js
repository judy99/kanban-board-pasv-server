import {MAX_PRIORITY, MIN_PRIORITY} from "./const";
import {DeleteTaskModal} from "./DeleteTaskModal";
import {UpdateTaskModal} from "./UpdateTaskModal";

export const Card = ({task, moveCardLeft, moveCardRight, firstCol, lastCol, decreasePriority, increasePriority,
                         removeCard, updateCard, statuses, priorities }) => {
    const {id, title, description, status, priority} = task
    return (
        <div className="card">
            <div className="card-header">
                {status}
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div>
                    <p className="card-text">Priority: {priority}
                        <button className="btn btn-primary" type="submit" onClick={() => increasePriority(id)}
                                disabled={+priority === MAX_PRIORITY}>↑
                        </button>
                        <button className="btn btn-primary" type="submit" onClick={() => decreasePriority(id)}
                                disabled={+priority === MIN_PRIORITY}>↓
                        </button>
                    </p>
                </div>
                <p className="card-text">{description}</p>
                <button className="btn btn-primary" type="submit" onClick={() => moveCardLeft(id)}
                        disabled={firstCol}>←
                </button>
                <button className="btn btn-primary" type="submit" onClick={() => moveCardRight(id)}
                        disabled={lastCol}>→
                </button>
                <DeleteTaskModal task={task} removeCard={removeCard} />
                <UpdateTaskModal task={task} updateCard={updateCard} statuses={statuses} priorities={priorities}/>
            </div>
        </div>
    )
}