import axios from 'axios'
import TokenContext from '../contexts/TokenProvider'
import '../assets/css/dashboard.css'
import DailyView from '../assets/components/DailyView'
import { useContext, useEffect, useState } from 'react'

export default function Dashboard() {

    const [name, setName] = useState("")
    const [tasks, setTasks] = useState()
    const { token } = useContext(TokenContext)
    const [selectedView, setSelectedView] = useState(
        {
            "DailyView": true,
            "WeeklyView": false
        }
    )

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3029/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 401) {
                    window.location = '/'
                }
                setName(response.data.name)
                setTasks(response.data.tasks)
                console.log(response)
            } catch (error) {
                if (response)
                console.log("Error fetching name: ", error)
            }
        }

        if (token) {
            fetchData()
        }
    }, [token])

    console.log(tasks)
    return (
        <div className='dashboard-container'>
             <section className='dashboard-sidebar'>
                <p className='dashboard-greeting'>Hi, {name}!</p>


                <nav>
                    <ul className='dashboard-views'>
                        <a className='dashboard-sidebar-buttons' href="">Daily View</a>
                        <a className='dashboard-sidebar-buttons' href="">Weekly View</a>
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

            {selectedView.DailyView && <DailyView tasks={tasks}/>}

        </div>
    )
}