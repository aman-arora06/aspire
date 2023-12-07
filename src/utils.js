export const generateCardNumber = () => {
    const getRandomFourDigitNumber = () => {
        // Generate a random number between 1000 and 9999
        return Math.floor(1000 + Math.random() * 9000)
    }
    return `${getRandomFourDigitNumber()} ${getRandomFourDigitNumber()} ${getRandomFourDigitNumber()} ${getRandomFourDigitNumber()}`
}

export const generateRandomFutureDate = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    // const currentMonth = today.getMonth()

    // Generate a random month and year within the next few years (adjust as needed)
    const futureYear = currentYear + Math.floor(Math.random() * 3) // Generate a year within the next 3 years
    const futureMonth = Math.floor(Math.random() * 12) // Generate a random month (0-11)

    // Format the future date as "mm/yy"
    const formattedDate = `${(futureMonth + 1)
        .toString()
        .padStart(2, '0')}/${futureYear.toString().slice(-2)}`

    return formattedDate
}

export const generateRandomAlphanumericNumber = () => {
    const charset =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset[randomIndex]
    }
    return result
}
