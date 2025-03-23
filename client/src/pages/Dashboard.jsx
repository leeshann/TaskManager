import axios from 'axios'
import TokenContext from '../contexts/TokenProvider'
import '../assets/css/dashboard.css'
import AllTasksView from '../components/AllTasksView'
import DailyView from '../components/DailyView'
import CalendarView from '../components/CalendarView'
import { useContext, useEffect, useState } from 'react'
import CategoryView from '../components/CategoryView'
import SearchedTasksView from '../components/SearchedTasksView'
import LogoutMenu from '../components/LogoutMenu'

export default function Dashboard() {

    const [name, setName] = useState("")
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const { token } = useContext(TokenContext)
    const [selectedView, setSelectedView] = useState('AllTasksView')
    const [dashboardInput, setDashboardInput] = useState("")
    const [showLogout, setShowLogout] = useState(false)

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

                const getAllCompletedTasks = await axios.get('http://localhost:3029/dashboard/getCompletedTasks', 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCompletedTasks(getAllCompletedTasks.data)
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
    }, [token])

    function handleSelectView(e) {
        setSelectedView(e.target.id)
        setDashboardInput("")
    }

    return (
        <>
            <div className='dashboard-container'>
                 <section className='dashboard-sidebar'>
                    <p className='dashboard-greeting'>Hi, {name}!</p>

                    <nav>
                        <ul className='dashboard-views'>
                            <button id="AllTasksView" className={selectedView === 'AllTasksView' ? 'dashboard-sidebar-selected' :'dashboard-sidebar-buttons'} onClick={handleSelectView}>All Tasks</button>
                            <button id="DailyView" className={selectedView === 'DailyView' ? 'dashboard-sidebar-selected' :'dashboard-sidebar-buttons'} onClick={handleSelectView}>Due Today</button>
                            <button id='CalendarView' className={selectedView === 'CalendarView' ? 'dashboard-sidebar-selected':'dashboard-sidebar-buttons'} onClick={handleSelectView}>Calendar View</button>
                        </ul>
                    </nav>

                    <p className='dashboard-categories-title'>CATEGORIES</p>
                    <nav>
                        <ul className='dashboard-categories'>
                            <a id="WorkView" className={selectedView === 'WorkView' ? 'dashboard-sidebar-selected' :'dashboard-sidebar-buttons'} onClick={handleSelectView}>Work</a>
                            <a id="PersonalView" className={selectedView === 'PersonalView' ? 'dashboard-sidebar-selected' :'dashboard-sidebar-buttons'} onClick={handleSelectView}>Personal</a>
                            <a id="HomeView" className={selectedView === 'HomeView' ? 'dashboard-sidebar-selected' :'dashboard-sidebar-buttons'} onClick={handleSelectView}>Home</a>
                        </ul>
                    </nav>
                </section>

                <section className='dashboard-searchbar'>
                    <input type="text" className='dashboard-input' placeholder='Search tasks...' value={dashboardInput} onChange={e => setDashboardInput(e.target.value)} />
                    <button type="button" class="dashboard-profile-button" onClick={e=> setShowLogout(prev => !prev)}>{name.charAt(0)}</button>
                    {showLogout && <LogoutMenu />}
                </section>


                {dashboardInput.trim().length === 0 && selectedView === 'AllTasksView' && <AllTasksView tasks={tasks} setAllTasks={setTasks} allCompletedTasks={completedTasks} setAllCompletedTasks={setCompletedTasks}/>}
                {dashboardInput.trim().length === 0 && selectedView === 'DailyView' && <DailyView tasks={tasks} setAllTasks={setTasks} allCompletedTasks={completedTasks} setAllCompletedTasks={setCompletedTasks}/>}
                {dashboardInput.trim().length === 0 && selectedView === 'CalendarView' && <CalendarView tasks={tasks} />}

                {dashboardInput.trim().length === 0 && selectedView === 'WorkView' && <CategoryView tasks={tasks} category="Work" setAllTasks={setTasks} allCompletedTasks={completedTasks} setAllCompletedTasks={setCompletedTasks}/>}
                {dashboardInput.trim().length === 0 && selectedView === 'PersonalView' && <CategoryView tasks={tasks} category="Personal" setAllTasks={setTasks} allCompletedTasks={completedTasks} setAllCompletedTasks={setCompletedTasks} />}
                {dashboardInput.trim().length === 0 && selectedView === 'HomeView' && <CategoryView tasks={tasks} category="Home" setAllTasks={setTasks} allCompletedTasks={completedTasks} setAllCompletedTasks={setCompletedTasks}/>}

                {dashboardInput.trim().length > 0 && <SearchedTasksView tasks={tasks} inputValue={dashboardInput} setAllTasks={setTasks} setAllCompletedTasks={setCompletedTasks}/>}
            </div>
        </>
    )   
}