import HttpClient from "../http/HttpClient";

export default interface AccountGateway {
	signup (input: any): Promise<any>;
}

export class AccountGatewayHttp implements AccountGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	signup(input: any): Promise<any> {
		return this.httpClient.post("http://localhost:3001/signup", input);
	}

}

export class AccountGatewayFake implements AccountGateway {
	emails: string[] = [];

	async signup(input: any): Promise<any> {
		if (this.emails.includes(input.email)) {
			return {
				message: "Duplicated account"
			}
		}
		this.emails.push(input.email);
		return {
			accountId: "123"
		}
	}

}
