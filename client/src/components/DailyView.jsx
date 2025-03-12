import '../assets/css/dailyView.css'
import ListItem from './ListItem'
import AddTaskModal from './addTaskModal'
import { today } from '../utils/dateHandler'
import { useState } from 'react'

export default function DailyView(props) {

    const [tasks, setTasks] = useState(props.tasks)

    function propsIsArray() {
        if (!Array.isArray(props.tasks)) {
            console.error("Expected an array of tasks, but got:", props.tasks);
            return null; 
        } else {
            return true
        }
    }

    return (
        <>
            <AddTaskModal setTasks={setTasks}/>

            <div className='dailyView-task-area'>
                <section className='dailyView-header'>
                    <h1>Today's Tasks</h1>
                    <p>{today}</p>
                </section>

                <section className='dailyView-taskNav-container'>
                    <button className='dailyView-addTaskBtn' data-bs-toggle="modal" data-bs-target="#addTaskModal">Add Task +</button>
                    <button className='dailyView-viewAllBtn'>All</button>
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
                            {propsIsArray() && props.tasks.map(taskItem => {
                                return <ListItem key={taskItem.task_id} id={taskItem.task_id} description={taskItem.task_description} category={taskItem.category} due_date={taskItem.due_date} priority={taskItem.task_priority}/>
                            })}
                        </tbody>
                    </table>
                </section>
                
            </div>
        </>
    )
}