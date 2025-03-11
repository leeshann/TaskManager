export const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
})

const minYear = new Date().toLocaleDateString('en-US', {
    year: 'numeric'
})

const minMonth = new Date().toLocaleDateString('en-US', {
    month: 'numeric'
})

const minDay = today.split(" ")[2]

function formatMonth(month) {
    let newMonth = ""
    if (month.length === 1) {
        newMonth = month.padStart(2, 0)
    } else {
        return month
    }

    return newMonth
}

function formatDate(date) {
    let newDate = ""
    if (date.length === 1) {
        newDate = date.padStart(2, 0)
    } else {
        return date
    }

    return newDate
}

export function getMinDate() {
    const date = minYear + "-" + formatMonth(minMonth) + "-" + formatDate(minDay)
    return date
}