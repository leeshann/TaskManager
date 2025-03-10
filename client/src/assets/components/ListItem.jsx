import '../css/listItem.css'

export default function ListItem(props) {
    console.log(props.tasks)
    return (
        <>
            {props.tasks.map(task => {
                return <tr className='listItem'>
                    <td><button className='listItem-checkBtn'></button>{task.task_description}</td>
                    <td>{task.category}</td>
                    <td>{task.due_date}</td>
                    <td>{task.task_priority}</td>
                </tr>
            })}
        </>
    )
}