import axios from "axios";
const url = "http://localhost:3001";

export class ApiClient {
	// Token provider is current user. logoutHandler removes token
	constructor(tokenProvider, logoutHandler) {
		// Essntially parameters for the function
		this.tokenProvider = tokenProvider;
		this.logoutHandler = logoutHandler;
	}

	// Handles calls once Token is generated from login function
	authenticatedCall(method, url, data) {
		return axios({
			method,
			url,
			// headers: {
			// 	authorization: this.tokenProvider(),
			// },
			data,
		}).catch((error) => {
			if (error.response.status === 403) {
				console.log(error);
				return Promise.reject();
			} else {
				return Promise.resolve();
			}
		});
	}

	async getUserByToken(token) {
		return this.authenticatedCall("get", `${url}/user/${token}`);
	}

	// Differences from original code start here
	getEvents() {
		return this.authenticatedCall("get", url);
	}

	async login(username, password) {
		return axios({
			method: "post",
			url: `${url}/auth`,
			data: {
				username,
				password,
			},
		}).catch((error) => {
			throw error;
		});
	}

	async getUsername(token) {
		return axios({
			method: "get",
			url: `${url}/user/`,
		});
	}

	// Gets 1 even based on location parameter
	addEvent(name, description, location, date, time, image, username) {
		return this.authenticatedCall("post", url, {
			name,
			description,
			location,
			date,
			time,
			image,
			username,
		});
	}

	addUser(username, password) {
		return this.authenticatedCall("post", `${url}/register`, {
			username,
			password,
		});
	}

	removeEvent(_id) {
		return this.authenticatedCall("delete", `${url}${_id}`);
	}

	updateEvent(_id, name, description, location, time, date, image) {
		return this.authenticatedCall("put", `${url}${_id}`, {
			name,
			description,
			location,
			time,
			date,
			image,
		});
	}
}
