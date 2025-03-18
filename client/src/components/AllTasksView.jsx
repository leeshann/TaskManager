import '../assets/css/dailyView.css'
import ListItem from './ListItem'
import AddTaskModal from './addTaskModal'
import { today } from '../utils/dateHandlers'
import { propsIsArray } from '../utils/validators'
import { useState, useEffect, useContext } from 'react'
import TokenContext from '../contexts/TokenProvider'


export default function AllTasksView(props) {

    const { token } = useContext(TokenContext)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTasks(props.tasks.map((taskItem) => ({
            ...taskItem, 
            due_date: new Date(taskItem.due_date).toLocaleString("en-US", {timeZone: userTimeZone})
        })))
    }, [props.tasks])
    
    return (
        <>
            <AddTaskModal setAllTasks={props.setAllTasks}/>

            <div className='dailyView-task-area'>
                <section className='dailyView-header'>
                    <h1>All Tasks</h1>
                    <p>{today}</p>
                </section>

                <section className='dailyView-taskNav-container'>
                    <button className='dailyView-addTaskBtn' data-bs-toggle="modal" data-bs-target="#addTaskModal">Add Task +</button>
                    <button className='dailyView-viewCompletedBtn'>Completed</button>
                </section>

                <section className='dailyView-tableContainer'>
                    <table class="table dailyView-tableStyle">
                        <thead>
                            <tr>
                                <th className='dailyView-taskCol' scope="col">TASK</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">DUE DATE</th>
                                <th scope="col">PRIORITY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propsIsArray(tasks) && tasks.map(taskItem => {
                                return <ListItem 
                                        key={taskItem.task_id} 
                                        id={taskItem.task_id} 
                                        description={taskItem.task_description} 
                                        category={taskItem.category} 
                                        due_date={taskItem.due_date} 
                                        priority={taskItem.task_priority} 
                                        setAllTasks={props.setAllTasks}/>
                            })}
                        </tbody>
                    </table>
                </section>
                
            </div>
        </>
    )
}