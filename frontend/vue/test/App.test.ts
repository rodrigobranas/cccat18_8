import { mount, VueWrapper } from "@vue/test-utils";
import App from "../src/App.vue";
import { AccountGatewayFake, AccountGatewayHttp } from "../src/infra/gateway/AccountGateway";
import { FetchAdapter } from "../src/infra/http/HttpClient";

let wrapper: VueWrapper;

beforeEach(() => {
	wrapper = mount(App, {
		global: {
			provide: {
				accountGateway: new AccountGatewayFake()
			}
		}
	});
});

test("Deve testar o progresso no preenchimento", async () => {
	expect(wrapper.get(".progress").text()).toBe("0%");
	expect(wrapper.get(".step").text()).toBe("1");
	await wrapper.get(".input-is-passenger").setValue(true);
	expect(wrapper.get(".progress").text()).toBe("25%");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("2");
	await wrapper.get(".button-previous").trigger("click");
	expect(wrapper.get(".step").text()).toBe("1");
	await wrapper.get(".button-next").trigger("click");
	await wrapper.get(".input-name").setValue("John Doe");
	expect(wrapper.get(".progress").text()).toBe("45%");
	await wrapper.get(".input-email").setValue("john.doe@gmail.com");
	expect(wrapper.get(".progress").text()).toBe("65%");
	await wrapper.get(".input-cpf").setValue("12345678910");
	expect(wrapper.get(".progress").text()).toBe("85%");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("3");
	await wrapper.get(".button-previous").trigger("click");
	expect(wrapper.get(".step").text()).toBe("2");
	await wrapper.get(".button-next").trigger("click");
	await wrapper.get(".input-password").setValue("123456");
	expect(wrapper.get(".progress").text()).toBe("85%");
	await wrapper.get(".input-confirm-password").setValue("12345678");
	expect(wrapper.get(".progress").text()).toBe("85%");
	await wrapper.get(".input-confirm-password").setValue("123456");
	expect(wrapper.get(".progress").text()).toBe("100%");
});

test("Deve testar a visibilidade dos componentes", async () => {
	expect(wrapper.find(".input-is-passenger").exists()).toBe(true);
	expect(wrapper.find(".input-name").exists()).toBe(false);
	expect(wrapper.find(".input-email").exists()).toBe(false);
	expect(wrapper.find(".input-cpf").exists()).toBe(false);
	expect(wrapper.find(".input-password").exists()).toBe(false);
	expect(wrapper.find(".input-confirm-password").exists()).toBe(false);
	expect(wrapper.find(".button-previous").exists()).toBe(false);
	expect(wrapper.find(".button-next").exists()).toBe(true);
	await wrapper.get(".input-is-passenger").setValue(true);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.find(".input-is-passenger").exists()).toBe(false);
	expect(wrapper.find(".input-name").exists()).toBe(true);
	expect(wrapper.find(".input-email").exists()).toBe(true);
	expect(wrapper.find(".input-cpf").exists()).toBe(true);
	expect(wrapper.find(".input-password").exists()).toBe(false);
	expect(wrapper.find(".input-confirm-password").exists()).toBe(false);
	expect(wrapper.find(".button-previous").exists()).toBe(true);
	expect(wrapper.find(".button-next").exists()).toBe(true);
	await wrapper.get(".input-name").setValue("John Doe");
	await wrapper.get(".input-email").setValue("john.doe@gmail.com");
	await wrapper.get(".input-cpf").setValue("12345678910");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.find(".input-is-passenger").exists()).toBe(false);
	expect(wrapper.find(".input-name").exists()).toBe(false);
	expect(wrapper.find(".input-email").exists()).toBe(false);
	expect(wrapper.find(".input-cpf").exists()).toBe(false);
	expect(wrapper.find(".input-password").exists()).toBe(true);
	expect(wrapper.find(".input-confirm-password").exists()).toBe(true);
	expect(wrapper.find(".button-previous").exists()).toBe(true);
	expect(wrapper.find(".button-next").exists()).toBe(false);
});

test("Deve testar os erros no preenchimento", async () => {
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.find(".label-error").exists()).toBe(true);
	expect(wrapper.get(".error").text()).toBe("Selecione o tipo de conta");
	await wrapper.get(".input-is-passenger").setValue(true);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.find(".error").exists()).toBe(false);
	expect(wrapper.find(".label-error").exists()).toBe(false);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Digite o nome");
	await wrapper.get(".input-name").setValue("John Doe");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Digite o email");
	await wrapper.get(".input-email").setValue("john.doe@gmail.com");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Digite o cpf");
	await wrapper.get(".input-cpf").setValue("12345678910");
	await wrapper.get(".button-next").trigger("click");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Digite a senha");
	await wrapper.get(".input-password").setValue("123456");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Digite a confirmação da senha");
	await wrapper.get(".input-confirm-password").setValue("12345678");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".error").text()).toBe("A senha e a confirmação da senha devem ser iguais");
	await wrapper.get(".input-confirm-password").setValue("123456");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.find(".error").exists()).toBe(false);
});

test("Deve testar o preenchimento completo", async () => {
	await wrapper.get(".input-is-passenger").setValue(true);
	await wrapper.get(".button-next").trigger("click");
	await wrapper.get(".input-name").setValue("John Doe");
	await wrapper.get(".input-email").setValue(`john.doe${Math.random()}@gmail.com`);
	await wrapper.get(".input-cpf").setValue("97456321558");
	await wrapper.get(".button-next").trigger("click");
	await wrapper.get(".input-password").setValue("123456");
	await wrapper.get(".input-confirm-password").setValue("123456");
	await wrapper.get(".button-confirm").trigger("click");
	await sleep(200);
	expect(wrapper.find(".success").exists()).toBe(true);
	await wrapper.get(".button-confirm").trigger("click");
	await sleep(200);
	expect(wrapper.find(".error").exists()).toBe(true);
});

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
}
