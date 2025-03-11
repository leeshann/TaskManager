import '../assets/css/listItem.css'

export default function ListItem(props) {
    if (!Array.isArray(props.tasks)) {
        console.error("Expected an array of tasks, but got:", props.tasks);
        return null; 
    }
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