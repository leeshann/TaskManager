import axios from 'axios'

export async function handleUpdateTask(formData, token, modalRef, setTasks) {
    const reformattedData = {
        ...formData,
        due_date: `${formData.due_date} ${formData.due_time}`
    }
    try {
        const response = await axios.put('http://localhost:3029/dashboard', reformattedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const getAllTasks = await axios.get('http://localhost:3029/dashboard',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setTasks(getAllTasks.data.tasks)
        modalRef.current.hide()
    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
            if (error.response.status === 401) {
                window.location = '/'
            }
        } else {
            console.log(error.message)
        }
    }
}