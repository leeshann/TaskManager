// DATE HANDLERS

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

// TIMEZONE HANDLERS

export function getLocalizedDateTime(due_date) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const localizedDateTime = new Date(due_date).toLocaleString("en-US", { timezone: userTimeZone})
    return localizedDateTime
// returns 3/17/2025, 8:00:00
}

// takes 3/17/2025
export function getReformattedDate(date) {
    const [month, day, year] = date.split("/")
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

// takes 8:00:00 PM
export function getReformattedTime(time) {
    const [hour, min, sec] = time.substring(0, 7).split(":")
    return `${hour.padStart(2, '0')}:${min}:${sec}`
}