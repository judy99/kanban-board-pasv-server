import {MAX_PRIORITY, MIN_PRIORITY} from "./const";

export const Card = ({task, moveCardLeft, moveCardRight, firstCol, lastCol, decreasePriority, increasePriority,
                        setShowModal, setShowModalDelete, getTaskById}) => {
    const {id, name, description, status, priority} = task

    return (
        <div className="card">
            <div className="card-header">
                {status}
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <div>
                    <p className="card-text">Priority: {priority}
                        <button className="btn btn-primary" type="submit" onClick={() => increasePriority(id)}
                                disabled={priority === MAX_PRIORITY}>↑
                        </button>
                        <button className="btn btn-primary" type="submit" onClick={() => decreasePriority(id)}
                                disabled={priority === MIN_PRIORITY}>↓
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
                <button className="btn btn-primary" type="button" onClick={() => {
                    getTaskById(id)
                    setShowModalDelete(true)
                }}>Delete</button>
                <button className="btn btn-primary" type="button" onClick={() => {
                    getTaskById(id)
                    setShowModal(true)
                }}>Update</button>
            </div>
        </div>
    )
}