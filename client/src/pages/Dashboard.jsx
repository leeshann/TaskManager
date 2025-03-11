import axios from 'axios'
import TokenContext from '../contexts/TokenProvider'
import '../assets/css/dashboard.css'
import DailyView from '../components/DailyView'
import WeeklyView from '../components/WeeklyView'
import { useContext, useEffect, useState } from 'react'

export default function Dashboard() {

    const [name, setName] = useState("")
    const [tasks, setTasks] = useState()
    const { token } = useContext(TokenContext)
    const [selectedView, setSelectedView] = useState('DailyView')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3029/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setName(response.data.name)
                setTasks(response.data.tasks)
                console.log(response)
            } catch (error) {
                if (error.response) {
                    console.log("Error fetching data: ", error.response.data)
                    if (error.response.status === 401) {
                        window.location = '/'
                    }
                } 
            }
        }

        if (token) {
            fetchData()
        }
    }, [token, tasks])

    return (
        <div className='dashboard-container'>
             <section className='dashboard-sidebar'>
                <p className='dashboard-greeting'>Hi, {name}!</p>

                <nav>
                    <ul className='dashboard-views'>
                        <button id="DailyView" className={selectedView === 'DailyView' ? 'dashboard-sidebar-selected' :'dashboard-sidebar-buttons'} onClick={e => setSelectedView(e.target.id)} href="">Daily View</button>
                        <button id='WeeklyView' className={selectedView === 'WeeklyView' ? 'dashboard-sidebar-selected':'dashboard-sidebar-buttons'} onClick={e => setSelectedView( e.target.id)} href="">Weekly View</button>
                    </ul>
                </nav>

                <p className='dashboard-categories-title'>CATEGORIES</p>
                <nav>
                    <ul className='dashboard-categories'>
                        <a className='dashboard-sidebar-buttons' href="">Work</a>
                        <a className='dashboard-sidebar-buttons' href="">Personal</a>
                        <a className='dashboard-sidebar-buttons' href="">Home</a>
                    </ul>
                </nav>
            </section>

            <section className='dashboard-searchbar'>
                <input type="text" className='dashboard-input' placeholder='Search tasks...'/>
                <button>profile</button>
            </section>

            {selectedView === 'DailyView' && <DailyView tasks={tasks}/>}
            {selectedView === 'WeeklyView' && <WeeklyView />}

        </div>
    )
}