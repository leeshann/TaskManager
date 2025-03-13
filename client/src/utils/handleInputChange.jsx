export function handleInputChange(e, setFormData) {
    const { value, name } = e.target
    setFormData(prev => ({
        ...prev,
        [name]: value
    }))
}