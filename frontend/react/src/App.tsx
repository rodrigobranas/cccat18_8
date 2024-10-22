import { useState } from "react";
import WizardSignup from "./WizardSignup";

function App() {
	const [wizard, setWizard] = useState(new WizardSignup());

	function reload(fn: any) {
		if (fn) fn();
		setWizard(clone(wizard));
	}
	return (
		<div>
			<div>
				<span>Passo:</span>
				<span>{wizard.step}</span>
			</div>
			<div>
				<span>Progresso:</span>
				<span>{wizard.getProgress()}%</span>
			</div>
			<div>
				<span>Erro:</span>
				<span>{wizard.error}</span>
			</div>
			<hr />
			{wizard.step === 1 && <div>
				<span>Passageiro:</span>
				<input className="input-is-passenger" type="checkbox" onChange={() => reload(() => wizard.form.isPassenger = !wizard.form.isPassenger)} />
			</div>}
			{wizard.step === 2 && <div>
				<div>
					<input className="input-name" type="text" onChange={(e) => reload(() => wizard.form.name = e.target.value)} placeholder="Nome" />
				</div>
				<div>
					<input className="input-email" type="text" onChange={(e) => reload(() => wizard.form.email = e.target.value)} placeholder="Email" />
				</div>
				<div>
					<input className="input-cpf" type="text" onChange={(e) => reload(() => wizard.form.cpf = e.target.value)} placeholder="Cpf" />
				</div>
			</div>}
			{ wizard.step === 3 && <div>
				<div>
					<input className="input-password" type="text" onChange={(e) => reload(() => wizard.form.password = e.target.value)} placeholder="Senha" />
				</div>
				<div>
					<input className="input-confirm-password" type="text" onChange={(e) => reload(() => wizard.form.confirmPassword = e.target.value)} placeholder="Confirmação da Senha" />
				</div>
			</div>}
			<hr />
			{wizard.step > 1 && <button className="button-previous" onClick={() => reload(() => wizard.previous())}>Próximo</button>}
			{wizard.step < 3 && <button className="button-next" onClick={() => reload(() => wizard.next())}>Próximo</button>}
			{wizard.step == 3 && <button className="button-confirm" onClick={() => reload(() => wizard.confirm())}>Confirmar</button>}
		</div>
	)
}

function clone(obj: any) {
	var copy = new obj.constructor;
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	}
	return copy;
}

export default App
