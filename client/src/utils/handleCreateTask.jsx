import axios from 'axios'

const initialFormData = {
    description: "",
    due_date: "",
    due_time: "",
    category: "",
    priority: ""
}

export async function handleCreateTask(e, formData, setInvalidData, token, setFormData, modalRef, setParentTasks) {
    e.preventDefault()
    let isValidInfo = true

    for (const [key, value] of Object.entries(formData)) {
        if (
            value.trim().length === 0 || 
            value === "Select a category" ||
            value === "Set priority") {
                isValidInfo = false
                break
            } 
    }

    if (!isValidInfo) {
        setInvalidData(true)
        return
    }

    setInvalidData(false)
    const reformattedData = {
        description: formData.description,
        due_date: formData.due_date + " " + formData.due_time,
        category: formData.category,
        priority: formData.priority
    }

    try {
        const response = await axios.post("http://localhost:3029/dashboard/newTask", reformattedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("response is: " , response)
        modalRef.current.hide()

        const getAllTasks = await axios.get("http://localhost:3029/dashboard/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setFormData(initialFormData)
        setParentTasks(getAllTasks.data.tasks)
        document.getElementsByName("description").value = ""

    } catch (error) {
        if (error.response) {
            console.log("Error fetching data: ", error.response.data)
            if (error.response.status === 401) {
                window.location = '/'
            }
        } 
    }
}
