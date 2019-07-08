import axios from 'axios'

const instance = axios.create({
    baseURL:'https://contactmanager-b87ad.firebaseio.com'
})

export default instance;