export const Card = ({task, moveCardLeft, moveCardRight}) => {
    const {id, name, description, status, priority} = task
    console.log('in card ', id)
    return (
        <div className="card">
            <div className="card-header">
                {status}
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <div>
                    <p className="card-text">Priority: {priority}
                    <button className="btn btn-primary" type="submit">↑</button>
                    <button className="btn btn-primary" type="submit">↓</button></p>
                </div>

                <p className="card-text">{description}</p>
                <button className="btn btn-primary" type="submit" onClick={() => moveCardLeft(id)}>←</button>
                <button className="btn btn-primary" type="submit" onClick={() => moveCardRight(id)}>→</button>
                <button className="btn btn-primary" type="submit">Delete</button>
                <button className="btn btn-primary" type="submit">Update</button>
            </div>
        </div>
    )
}