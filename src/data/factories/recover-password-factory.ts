import { ApiRecoverPassword, LocalRecoverPassword } from "@/data/usecases/recover-password-request";
import { RecoverPasswordError } from "@/data/errors/recover-password-error";

export function makeLocalRecoverPassword() {
	return new LocalRecoverPassword()
}

export function makeApiRecoverPassword() {
	const errHandler = new RecoverPasswordError()
	return new ApiRecoverPassword(errHandler)
}