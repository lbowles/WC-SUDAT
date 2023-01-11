import axios from 'axios'

//url port
export default axios.create({
  baseURL: 'http://localhost:5001/wc-sudat/us-central1/api',
})
