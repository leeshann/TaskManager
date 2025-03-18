import '../assets/css/listItem.css'
import UpdateTaskModal from './UpdateTaskModal'
import { getTaskInformation } from '../utils/getTaskInformation'
import { useContext, useState } from 'react'
import TokenContext from '../contexts/TokenProvider'
import axios from 'axios'

export default function ListItem(props) {
    const { token } = useContext(TokenContext)
    const [completed, setCompeleted] = useState(props.completed)
    const [formData, setFormData] = useState(
        {
            description: "",
            due_date: "",
            category: "",
            priority: ""
        }
    )

    async function handleDeleteTask(e) {
        try {
            await axios.delete(`http://localhost:3029/dashboard/task/${props.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const getAllTasks = await axios.get('http://localhost:3029/dashboard',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            props.setAllTasks(getAllTasks.data.tasks)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    async function handleMarkCompleted(e) {
        setCompeleted(prev => !prev)
        try {
            const response = await axios.put('http://localhost:3029/dashboard/toggleCompleted', {task_id: props.id}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const getAllCompletedTasks = await axios.get('http://localhost:3029/dashboard/getCompletedTasks', 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const getAllTasks = await axios.get('http://localhost:3029/dashboard/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            props.setAllCompletedTasks(getAllCompletedTasks.data)
            props.setAllTasks(getAllTasks.data.tasks)

        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <>
            <UpdateTaskModal id={props.id} formData={formData} setAllTasks={props.setAllTasks}/>
             <tr id={props.id} className='listItem'>
                    <td>
                        <button className={completed ? 'listItem-checkBtnCompleted' : 'listItem-checkBtn'} onClick={handleMarkCompleted}></button>

                        <section className='listItem-content'>
                            <p className='listItem-description'>{props.description}</p>
                            <section className='listItem-editDeleteContainer'>
                                {!completed && <button type="button" data-bs-toggle="modal" data-bs-target={`#updateTaskModal${props.id}`} className='listItem-editBtn' onClick={() => getTaskInformation(props.id, token, setFormData)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                    </svg>
                                </button>}
                                {!completed &&<button className='listItem-deleteBtn' onClick={handleDeleteTask}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                    </svg>
                                </button>}
                            </section>
                        </section>
                    </td>
                    <td><section className='listItem-centerdata'>{props.category}</section></td>
                    <td><section className='listItem-centerdata'>{props.due_date}</section></td>
                    <td><section className='listItem-centerdata'><p className={props.priority === 'Medium' ? 'medium-priority' : props.priority === 'High' ? 'high-priority' : 'low-priority'}>{props.priority}</p></section></td>
            </tr>
        </>
    )
}