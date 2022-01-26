const emailIsValid = (email) => {
    const tester = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return tester.test(String(email).toLowerCase())
}

const passwordIsValid = (password) => {
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regEx.test(String(password))
}

module.exports = {emailIsValid, passwordIsValid}