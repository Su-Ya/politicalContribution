import axios from "axios";

export default class Http {
	#http = null;
	constructor(config) {
		this.#http = axios.create({
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			...config
		});
	}

	get interceptors() {
    return this.#http.interceptors;
  }
	async get(url, params, config) {
		return this.#http.get(url, { ...config, params })
	}
	async post(url, data, config) {
		return this.#http.post(url, data, config)
	}
	async put(url, data, config) {
		return this.#http.put(url, data, config)
	}
	async patch(url, data, config) {
		return this.#http.patch(url, data, config)
	}
	async delete(url, config) {
		return this.#http.delete(url, config)
	}
}