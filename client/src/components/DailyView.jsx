import '../assets/css/dailyView.css'
import ListItem from './ListItem'
import AddTaskModal from './addTaskModal'
import { today } from '../utils/dateHandler'

export default function DailyView(props) {

    return (
        <>
            <AddTaskModal />

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
                            <ListItem tasks={props.tasks}/>
                        </tbody>
                    </table>
                </section>
                
            </div>
        </>
    )
}