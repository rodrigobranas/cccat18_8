import WizardSignup from "../src/domain/WizardSignup";

test("Deve testar o progresso no preenchimento", async () => {
	const wizard = new WizardSignup();
	expect(wizard.getProgress()).toBe(0);
	expect(wizard.step).toBe(1);
	wizard.form.isPassenger = true;
	expect(wizard.getProgress()).toBe(25);
	wizard.next();
	expect(wizard.step).toBe(2);
	wizard.previous();
	expect(wizard.step).toBe(1);
	wizard.next();
	expect(wizard.step).toBe(2);
	wizard.form.name = "John Doe";
	expect(wizard.getProgress()).toBe(45);
	wizard.form.email = "john.doe@gmail.com";
	expect(wizard.getProgress()).toBe(65);
	wizard.form.cpf = "12345678910";
	expect(wizard.getProgress()).toBe(85);
	wizard.next();
	expect(wizard.step).toBe(3);
	wizard.previous();
	expect(wizard.step).toBe(2);
	wizard.next();
	expect(wizard.step).toBe(3);
	wizard.form.password = "123456";
	expect(wizard.getProgress()).toBe(85);
	wizard.form.confirmPassword = "12345678";
	expect(wizard.getProgress()).toBe(85);
	wizard.form.confirmPassword = "123456";
	expect(wizard.getProgress()).toBe(100);
});

test("Deve testar os erros no preenchimento", async () => {
	const wizard = new WizardSignup();
	wizard.next();
	expect(wizard.error).toBe("Selecione o tipo de conta");
});
