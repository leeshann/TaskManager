import { today, getMinDate } from '../utils/dateHandler'
import ListItem from './ListItem'
import AddTaskModal from './addTaskModal'
import { useState, useEffect, use } from 'react'


export default function DailyView(props) {

    const [todaysTasks, setTodaysTasks] = useState("")

    function propsIsArray(arr) {
        if (!Array.isArray(arr)) {
            console.error("Expected an array of tasks, but got:", props.tasks);
            return null; 
        } else {
            return true
        }
    }

    useEffect(() => {
        if (propsIsArray(props.tasks)) {
            setTodaysTasks(props.tasks.filter((taskItem) => {
            return taskItem.due_date.includes(getMinDate())
        }))} else {
            setTodaysTasks("")
        }
    },[props.tasks])

    

    console.log("Unfiltered tasks: ")
    console.log(props.tasks)
    console.log("Todays tasks are: ")
    console.log(todaysTasks)

    return (
        <>
        <AddTaskModal setTasks={setTodaysTasks} />

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
                            return <ListItem key={taskItem.task_id} id={taskItem.task_id} description={taskItem.task_description} category={taskItem.category} due_date={taskItem.due_date} priority={taskItem.task_priority}/>
                        })}
                    </tbody>
                </table>
            </section>
            
        </div>
    </>
    )
}