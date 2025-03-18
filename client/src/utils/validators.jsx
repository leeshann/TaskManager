export function propsIsArray(arr) {
    if (!Array.isArray(arr)) {
        console.error("Expected an array of tasks, but got:", arr);
        return null; 
    } else {
        console.log("Tasks is array")
        return true
    }
}