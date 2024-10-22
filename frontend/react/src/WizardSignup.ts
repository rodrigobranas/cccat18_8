import Observable from "./Observable";

export default class WizardSignup extends Observable {
	form = {
		isPassenger: false,
		name: "",
		email: "",
		cpf: "",
		password: "",
		confirmPassword: ""
	};
	step = 1;
	error = "";
	success = "";
	

	getProgress () {
		let progress = 0;
		if (this.form.isPassenger) progress += 25;
		if (this.form.name) progress += 20;
		if (this.form.email) progress += 20;
		if (this.form.cpf) progress += 20;
		if (
			this.form.password && 
			this.form.confirmPassword && 
			this.form.password === this.form.confirmPassword
		) {
			progress += 15;
		}
		return progress;
	}

	next () {
		if (!this.validate()) return;
		this.step++;
	}

	previous () {
		this.step--;
	}

	validate () {
		this.error = "";
		if (this.step === 1 && !this.form.isPassenger) {
			this.error = "Selecione o tipo de conta";
			return false;
		}
		if (this.step === 2 && !this.form.name) {
			this.error = "Digite o nome";
			return false;
		}
		if (this.step === 2 && !this.form.email) {
			this.error = "Digite o email";
			return false;
		}
		if (this.step === 2 && !this.form.cpf) {
			this.error = "Digite o cpf";
			return false;
		}
		if (this.step === 3 && !this.form.password) {
			this.error = "Digite a senha";
			return false;
		}
		if (this.step === 3 && !this.form.confirmPassword) {
			this.error = "Digite a confirmação da senha";
			return false;
		}
		if (this.step === 3 && (this.form.password !== this.form.confirmPassword)) {
			this.error = "A senha e a confirmação da senha devem ser iguais";
			return false;
		}
		return true;
	}

	confirm () {
		if (!this.validate()) return;
		this.notify("confirmed", this.form);
	}

	populate () {
		this.form.isPassenger = true;
		this.form.name = "John Doe";
		this.form.email = `john.doe${Math.random()}@gmail.com`;
		this.form.cpf = "97456321558";
		this.form.password = "123456";
		this.form.confirmPassword = "123456";
	}
}
