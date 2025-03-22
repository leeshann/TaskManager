import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import '../assets/css/CalendarView.css'
import { propsIsArray } from '../utils/validators'
import { useEffect, useState } from 'react'

export default function CalendarView(props) {
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (propsIsArray(props.tasks)) {
            const eventsArray = props.tasks.map((taskItem) => ({
                id: taskItem.task_id,
                start: taskItem.due_date,
                title: taskItem.task_description,
                category: taskItem.category
            }))
            setEvents(eventsArray)
            console.log(eventsArray)
        }
    }, [props.tasks])

    return (
        <div className='calendar'>
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            events={events}
            eventDisplay='list-item'
            initialView="dayGridMonth"
            />
        </div>
    )
}