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

test("Deve testar o preenchimento completo", async () => {
	expect(wrapper.get(".progress").text()).toBe("0%");
	expect(wrapper.get(".step").text()).toBe("1");
	await wrapper.get(".input-is-passenger").setValue(true);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("2");
	await wrapper.get(".button-previous").trigger("click");
	expect(wrapper.get(".step").text()).toBe("1");
	await wrapper.get(".button-next").trigger("click");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Digite o nome");
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
