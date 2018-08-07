import axios from 'axios'

export const http = axios.create({
	headers: {
    'Content-Type': 'application/json'
  },
})

export const apiUrl = (method, params = []) => {
	const origin = 'localhost:6060'

	return `http://${origin}/${method.toLowerCase()}/${params.join('/')}`
}
