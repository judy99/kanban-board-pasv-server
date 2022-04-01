import {Card} from "./Card";

export const Column = (props) => {
    console.log(props)
    const {status, tasks, moveCardLeft, moveCardRight} = props

    return (
        // <div className="row align-items-center">
            <div className="col">
                <h2>{status.status}</h2>
                {tasks.filter(el => el.status === status.status).map((task) => {
                    return <Card task={task} moveCardRight={moveCardRight} moveCardLeft={moveCardLeft} />
                })}
            </div>
        // </div>
    )
}