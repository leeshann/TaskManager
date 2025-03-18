import { today, getMinDate, getLocalizedDateTime } from '../utils/dateHandlers'
import { propsIsArray } from '../utils/validators'
import ListItem from './ListItem'
import AddTaskModal from './addTaskModal'
import { useState, useEffect } from 'react'


export default function DailyView(props) {

    const [todaysTasks, setTodaysTasks] = useState([])

    useEffect(() => {
        if (propsIsArray(props.tasks)) {
            const tasks_with_reformatted_date = props.tasks.map((taskItem) => ({
                ...taskItem,
                due_date: getLocalizedDateTime(taskItem.due_date)
            }))
            
            setTodaysTasks(tasks_with_reformatted_date)

        } else if (!props.tasks) {
            setTodaysTasks([])
        }
    }, [props.tasks])


    return (
        <>
        <AddTaskModal setAllTasks={props.setAllTasks} />

        <div className='dailyView-task-area'>
            <section className='dailyView-header'>
                <h1>Today's tasks</h1>
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
                        {propsIsArray(todaysTasks) && todaysTasks.map(taskItem => {
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