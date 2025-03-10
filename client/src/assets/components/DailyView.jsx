import '../css/dailyView.css'
import ListItem from './ListItem'
import { useState } from 'react'

export default function DailyView(props) {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className='dailyView-task-area'>
            <section className='dailyView-header'>
                <h1>Today's Tasks</h1>
                <p>{today}</p>
            </section>

            <section className='dailyView-taskNav-container'>
                <button className='dailyView-addTaskBtn'>Add Task +</button>
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
                        {/* <tr className='dailyView-listItem'>
                            <td> 
                                <button className='dailyView-checkBtn'></button>
                                task is this
                            </td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr> */}
                        <ListItem tasks={props.tasks}/>
                    </tbody>
                </table>
            </section>
        </div>
    )
}