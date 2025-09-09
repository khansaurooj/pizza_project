// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:5000", // Flask backend
//   withCredentials: true, // important for JWT cookies if used
// });

// export default api;





const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000'


export async function api(path, { method = 'GET', body, token, headers = {} } = {}) {
const h = { 'Content-Type': 'application/json', ...headers }
const authToken = token || localStorage.getItem('token')
if (authToken) h['Authorization'] = `Bearer ${authToken}`


const res = await fetch(`${API_BASE}${path}`, {
method,
headers: h,
body: body ? JSON.stringify(body) : undefined,
})


if (!res.ok) {
const text = await res.text().catch(() => '')
throw new Error(text || `HTTP ${res.status}`)
}
const ct = res.headers.get('content-type') || ''
return ct.includes('application/json') ? res.json() : res.text()
}