import { today, getMinDate, getLocalizedDateTime, getConventionalDateFormat } from '../utils/dateHandlers'
import { propsIsArray } from '../utils/validators'
import ListItem from './ListItem'
import AddTaskModal from './addTaskModal'
import { useState, useEffect } from 'react'

export default function CategoryView(props){

    const [categoryTasks, setCategoryTasks] = useState([])
    const [completed, setCompleted] = useState([])
    const [showCompleted, setShowCompleted] = useState(false)


    useEffect(() => {
        if (propsIsArray(props.tasks)) {
            const tasks_with_localized_dateTime = props.tasks.map((taskItem) => ({
                ...taskItem,
                due_date: getLocalizedDateTime(taskItem.due_date)
            }))

            const category_tasks = tasks_with_localized_dateTime.filter((taskItem) => {
                return taskItem.category === props.category
            })

            setCategoryTasks(category_tasks)

        } else if (!props.tasks) {
            setCategoryTasks([])
        }
    }, [props.tasks])

    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setCompleted(props.allCompletedTasks.map((taskItem) => ({
            ...taskItem, 
            due_date: new Date(taskItem.due_date).toLocaleString("en-US", {timeZone: userTimeZone})
        })))
    }, [props.allCompletedTasks])

    return (
        <>
        <AddTaskModal setAllTasks={props.setAllTasks} />

        <div className='dailyView-task-area'>
            <section className='dailyView-header'>
                <h1>{props.category} Tasks</h1>
                <p>{today}</p>
            </section>

            <section className='dailyView-taskNav-container'>
                <button className='dailyView-addTaskBtn' data-bs-toggle="modal" data-bs-target="#addTaskModal">Add Task +</button>
                <button className='dailyView-viewCompletedBtn' onClick={() => setShowCompleted(prev => !prev)}>{!showCompleted ? 'View Completed' : 'View In Progress'}</button>
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
                        {!showCompleted && propsIsArray(categoryTasks) && categoryTasks.map(taskItem => {
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