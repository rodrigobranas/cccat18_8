import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

export default interface HttpClient {
	post (url: string, data: any): Promise<any>;
}

export class AxiosAdapter implements HttpClient {

	async post(url: string, data: any): Promise<any> {
		const response = await axios.post(url, data);
		return response.data;
	}

}

export class FetchAdapter implements HttpClient {

	async post(url: string, data: any): Promise<any> {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const output = await response.json();
		return output;
	}

}
