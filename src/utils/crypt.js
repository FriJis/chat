import CryptoJS from 'crypto-js'

let token = null

const setToken = (ttoken) => {
    token = ttoken
}
const getToken = () => {
    return token || null
}
const encrypt = (mess) => {
    return CryptoJS.AES.encrypt(mess, token).toString()
}
const decrypt = (mess) => {
    return CryptoJS.AES.decrypt(mess, token).toString(CryptoJS.enc.Utf8)
}

export {
    setToken,
    getToken,
    encrypt,
    decrypt,
    token
}