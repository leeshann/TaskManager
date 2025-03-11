import axios from 'axios'
import TokenContext from '../contexts/TokenProvider'
import { useState, useContext, useEffect } from 'react'
import { getMinDate } from '../utils/dateHandler'
import { handleCreateTask, handleInputChange } from '../utils/addTaskHandlers'




export default function AddTaskModal() {
    const { token } = useContext(TokenContext)

    const [formData, setFormData] = useState({
        description: "",
        due_date: "",
        due_time: "",
        category: "",
        priority: ""
    })

    const [invalidData, setInvalidData] = useState(false)

    useEffect(() => {
        const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'), {
            keyboard: false
        });
        
        window.addTaskModal = addTaskModal;
    
        return () => {
            addTaskModal.dispose();
        };
    }, []);

    return (
        <div class="modal fade" id="addTaskModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addModalLabel">New Task</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form className='dailyView-form'>
                            <section id='dailyView-formChild-1'>
                                <label htmlFor="description" className='dailyView-label'>Description</label>
                                <input name="description" type="text" placeholder='Enter task description...' value={formData.description} onChange={e => handleInputChange(e, setFormData)}/>
                            </section>

                            <section className='dailyView-formSections'>
                                <label htmlFor="due_date" className='dailyView-label'>Due Date</label>
                                <input name="due_date" type="date" min={getMinDate()} value={formData.due_date} onChange={e => handleInputChange(e, setFormData)}/>
                            </section>

                            <section className='dailyView-formSections'>
                                <label htmlFor="due_time" className='dailyView-label'>Due Time</label>
                                <input name="due_time" type="time" step="1" value={formData.due_time} onChange={e => handleInputChange(e, setFormData)}/>
                            </section>

                            <section>
                                <label htmlFor="category" className='dailyView-label'>Category</label>
                                <select id="category" name="category" class="form-select" aria-label="Select a category" value={formData.category} onChange={e => handleInputChange(e, setFormData)}>
                                    <option selected>Select a category</option>
                                    <option value="Work">Work</option>
                                    <option value="Home">Home</option>
                                    <option value="Personal">Personal</option>
                                </select>
                            </section>

                            <section>
                                <label htmlFor="priority" className='dailyView-label'>Priority</label>
                                <select id="priority" name="priority" class="form-select" aria-label="Select a priority" value={formData.priority} onChange={e => handleInputChange(e, setFormData)}>
                                    <option selected>Set priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </section>
                            {invalidData && <p className='displayView-invalidFormInfoMessage'>Please enter all required fields. Ensure date is valid.</p>}
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="dailyView-addTaskBtn" onClick={e => handleCreateTask(e, formData, setInvalidData, token, setFormData)}>Create Task</button>
                    </div>
                </div>
            </div>
        </div>
    )
}