import axios from 'axios'

export async function getTaskInformation(id, token, setFormData) {
    try {
        const response = await axios.get(`http://localhost:3029/dashboard/task/${id}`, 
            {
                headers: {
                        Authorization: `Bearer ${token}`
                    }
            })

        setFormData({
            description: response.data.task_description,
            due_date: response.data.due_date,
            category: response.data.category,
            priority: response.data.task_priority
        })
    } catch (error) {
        if (error.response) {
            console.log("Error fetching data: ", error.response.data)
            if (error.response.status === 401) {
                window.location = '/'
            }
        } else {
            console.log(error.message)
        }
    }
}