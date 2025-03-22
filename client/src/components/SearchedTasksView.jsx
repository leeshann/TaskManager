import {useEffect, useState} from 'react'
import { propsIsArray } from '../utils/validators'
import { getLocalizedDateTime } from '../utils/dateHandlers'
import ListItem from './ListItem'
import AddTaskModal from './addTaskModal'

export default function SearchedTasksView(props) {
    const [searchedTasks, setSearchTasks] = useState([])
    
    useEffect(() => {
        if (propsIsArray(props.tasks) && props.inputValue.trim().length > 0) {
            const tasks_with_localized_dateTime = props.tasks.map((taskItem) => ({
                ...taskItem,
                due_date: getLocalizedDateTime(taskItem.due_date)
            }))

            const tasks_that_match_search = tasks_with_localized_dateTime.filter(taskItem => {
                return taskItem.task_description.includes(props.inputValue)
            })

            setSearchTasks(tasks_that_match_search)

        } else if (!props.tasks) {
            setSearchTasks([])
        }
    }, [props.inputValue])

    return (
        <>
        <div className='dailyView-task-area'>

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
                        {propsIsArray(searchedTasks) && searchedTasks.map((taskItem) => {
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