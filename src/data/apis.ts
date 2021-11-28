import axios from "axios";

const usersBaseURL = process.env.USERS_API_BASE || "http://localhost:8080"
const localBaseURL = process.env.LOCAL_API_BASE || "http://localhost:3000/api"

export const usersApi = axios.create({
	baseURL: usersBaseURL,
})

Object.assign(usersApi.defaults.headers, {
	"x-api-key": process.env.X_API_KEY || "",
	"application": process.env.APPLICATION || "",
	"Accept": "application/json",
	"Content-Type": "application/json",
})

export const localApi = axios.create({
	baseURL: localBaseURL
})