import '../assets/css/dailyView.css'
import ListItem from './ListItem'
import AddTaskModal from './addTaskModal'
import { today } from '../utils/dateHandlers'
import { propsIsArray } from '../utils/validators'
import { useState, useEffect } from 'react'
// import TokenContext from '../contexts/TokenProvider'


export default function AllTasksView(props) {

    // const { token } = useContext(TokenContext)
    const [tasks, setTasks] = useState([])
    const [completed, setCompleted] = useState([])
    const [showCompleted, setShowCompleted] = useState(false)

    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTasks(props.tasks.map((taskItem) => ({
            ...taskItem, 
            due_date: new Date(taskItem.due_date).toLocaleString("en-US", {timeZone: userTimeZone})
        })))
    }, [props.tasks])

    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setCompleted(props.allCompletedTasks.map((taskItem) => ({
            ...taskItem, 
            due_date: new Date(taskItem.due_date).toLocaleString("en-US", {timeZone: userTimeZone})
        })))
    }, [props.allCompletedTasks])

    // console.log("All completed tasks are ")
    // console.log(completed)

    // console.log("All tasks are: ")
    // console.log(tasks)
    
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
                    <button className='dailyView-viewCompletedBtn' onClick={() => setShowCompleted(prev => !prev)}>{!showCompleted ? 'View Completed' : 'View In progress'}</button>
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
                            {!showCompleted && propsIsArray(tasks) && tasks.map(taskItem => {
                                return <ListItem 
                                        key={taskItem.task_id} 
                                        id={taskItem.task_id} 
                                        description={taskItem.task_description} 
                                        category={taskItem.category} 
                                        due_date={taskItem.due_date} 
                                        priority={taskItem.task_priority} 
                                        completed={taskItem.completed}
                                        setAllTasks={props.setAllTasks}
                                        setAllCompletedTasks={props.setAllCompletedTasks}
                                        />
                            })}
                            {showCompleted && propsIsArray(completed) && completed.map(taskItem => {
                                return <ListItem
                                        key={taskItem.task_id} 
                                        id={taskItem.task_id} 
                                        description={taskItem.task_description} 
                                        category={taskItem.category} 
                                        due_date={taskItem.due_date} 
                                        priority={taskItem.task_priority} 
                                        completed={taskItem.completed}
                                        setAllTasks={props.setAllTasks}
                                        setAllCompletedTasks={props.setAllCompletedTasks}
                                    />
                            })}
                        </tbody>
                    </table>
                </section>
                
            </div>
        </>
    )
}