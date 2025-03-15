import { useState, useContext, useEffect, useRef } from "react"
import { handleInputChange } from "../utils/handleInputChange"
import { handleUpdateTask } from "../utils/handleUpdateTask"
import TokenContext from '../contexts/TokenProvider'

export default function UpdateTaskModal(props) {
    const { token } = useContext(TokenContext)
    const [formData, setFormData] = useState({})
    const modalRef = useRef(null)

    useEffect(() => {
        setFormData({
            description: props.formData.description,
            due_date: props.formData.due_date.split("T")[0],
            due_time: props.formData.due_date.substring(11, 19),
            category: props.formData.category,
            priority: props.formData.priority,
            task_id: props.id
        })
    }, [props.formData])

    useEffect(() => {
        const modalElement = document.getElementById(`updateTaskModal${props.id}`)
        modalRef.current = new bootstrap.Modal(modalElement);
        
        return () => {
                modalRef.current.dispose()
        }
    }, [props.id])


    return (
       <>
        <div class="modal fade" id={`updateTaskModal${props.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog updateModal-borderSmooth">
                <div class="modal-content updateModal-borderNone">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">Update Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form className='dailyView-form'>
                                <section id='dailyView-formChild-1'>
                                    <label htmlFor="description" className='dailyView-label'>Description</label>
                                    <input name="description" type="text" placeholder='Enter task description...' value={formData.description} onChange={e => handleInputChange(e, setFormData)}/>
                                </section>

                                <section className='dailyView-formSections'>
                                    <label htmlFor="due_date" className='dailyView-label' >Due Date</label>
                                    <input name="due_date" type="date" value={formData.due_date} onChange={e => handleInputChange(e, setFormData)}/>
                                </section>

                                <section className='dailyView-formSections'>
                                    <label htmlFor="due_time" className='dailyView-label'>Due Time</label>
                                    <input name="due_time" type="time" step="1" value={formData.due_time} onChange={e => handleInputChange(e, setFormData)}/>
                                </section>

                                <section>
                                    <label htmlFor="category" className='dailyView-label'>Category</label>
                                    <select id="category" name="category" class="form-select" aria-label="Select a category"  value={formData.category} onChange={e => handleInputChange(e, setFormData)}>
                                        <option value="Select a category" selected>Select a category</option>
                                        <option value="Work">Work</option>
                                        <option value="Home">Home</option>
                                        <option value="Personal">Personal</option>
                                    </select>
                                </section>

                                <section>
                                    <label htmlFor="priority" className='dailyView-label'>Priority</label>
                                    <select id="priority" name="priority" class="form-select" aria-label="Select a priority" value={formData.priority} onChange={e => handleInputChange(e, setFormData)} >
                                        <option selected>Set priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </section>
                            </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="dailyView-addTaskBtn" 
                     onClick={() => handleUpdateTask(
                        formData, 
                        token, 
                        modalRef, 
                        props.setTasks
                    )}>Save changes</button>
                </div>
                </div>
            </div>
        </div>
       </>
    )
}