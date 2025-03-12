import '../assets/css/listItem.css'

export default function ListItem(props) {

    return (

             <tr id={props.id} className='listItem'>
                    <td><button className='listItem-checkBtn'></button>{props.description}</td>
                    <td>{props.category}</td>
                    <td>{props.due_date}</td>
                    <td>{props.task_priority}</td>
            </tr>
 
    )
}