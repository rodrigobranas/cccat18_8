<script setup lang="ts">
	import { ref, inject } from "vue";
	import AccountGateway from "./infra/gateway/AccountGateway";
	import { AxiosAdapter, FetchAdapter } from "./infra/http/HttpClient";
	import WizardSignup from "./domain/WizardSignup";

	const wizard = ref(new WizardSignup());
	const accountGateway = inject("accountGateway") as AccountGateway;

	wizard.value.register("confirmed", async function (form: any) {
		const output = await accountGateway.signup(form);
		if (output.accountId) {
			wizard.value.success = output.accountId;
		} else {
			wizard.value.success = false;
			wizard.value.error = output.message;
		}
	});
</script>

<template>
	<div>
		<span @click="wizard.populate()">Passo:</span>
		<span class="step">{{ wizard.step }}</span>
	</div>
	<div>
		<span>Progresso:</span>
		<span class="progress">{{ wizard.getProgress() }}%</span>
	</div>
	<div v-if="wizard.error">
		<span class="label-error">Erro:</span>
		<span class="error">{{ wizard.error }}</span>
	</div>
	<div v-if="wizard.success">
		<span class="label-success">Sucesso:</span>
		<span class="success">{{ wizard.success }}</span>
	</div>
	<hr/>
	<div v-if="wizard.step === 1">
		<span>Passageiro:</span>
		<input class="input-is-passenger" type="checkbox" v-model="wizard.form.isPassenger"/>
	</div>
	<div v-if="wizard.step === 2">
		<div>
			<input class="input-name" type="text" v-model="wizard.form.name" placeholder="Nome"/>
		</div>
		<div>
			<input class="input-email" type="text" v-model="wizard.form.email" placeholder="Email"/>
		</div>
		<div>
			<input class="input-cpf" type="text" v-model="wizard.form.cpf" placeholder="Cpf"/>
		</div>
	</div>
	<div v-if="wizard.step === 3">
		<div>
			<input class="input-password" type="text" v-model="wizard.form.password" placeholder="Senha"/>
		</div>
		<div>
			<input class="input-confirm-password" type="text" v-model="wizard.form.confirmPassword" placeholder="Confirmação da Senha"/>
		</div>
	</div>
	<button v-if="wizard.step > 1" class="button-previous" @click="wizard.previous()">Anterior</button>
	<button v-if="wizard.step < 3" class="button-next" @click="wizard.next()">Próximo</button>
	<button v-if="wizard.step === 3" class="button-confirm" @click="wizard.confirm()">Confirmar</button>
</template>

<style>
</style>
