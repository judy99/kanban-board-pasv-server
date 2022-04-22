import {Card} from "./Card";

export const Column = (props) => {
    const {status, tasks, moveCardLeft, moveCardRight, lastCol, firstCol, decreasePriority, increasePriority,
        removeCard, updateCard, statuses, priorities} = props
    return (
            <div className="col">
                <h2>{status}</h2>
                {tasks.filter(el => el.status === status).map((task, index) => {
                    return <Card key={index} task={task}
                                 moveCardRight={moveCardRight} moveCardLeft={moveCardLeft}
                                 lastCol={lastCol} firstCol={firstCol}
                                 decreasePriority={decreasePriority} increasePriority={increasePriority}
                                 removeCard={removeCard} updateCard={updateCard}
                                 statuses={statuses} priorities={priorities}
                    />
                })}
            </div>
    )
}