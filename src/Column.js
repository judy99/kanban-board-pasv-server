import {Card} from "./Card";

export const Column = (props) => {
    console.log(props)
    const {status, tasks, moveCardLeft, moveCardRight, lastCol, firstCol} = props

    return (
            <div className="col">
                <h2>{status.status}</h2>
                {tasks.filter(el => el.status === status.status).map((task, index) => {
                    return <Card task={task} moveCardRight={moveCardRight} moveCardLeft={moveCardLeft}
                                 lastCol={lastCol} firstCol={firstCol} />
                })}
            </div>
    )
}