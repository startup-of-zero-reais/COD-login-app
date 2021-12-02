import { ApiLoginRequest, LocalLoginRequest } from "@/data/usecases/login-request";
import { LoginErrors } from "@/data/errors/login-error";

export function makeApiLoginRequest() {
	const loginErrors = new LoginErrors()

	return new ApiLoginRequest(loginErrors)
}

export function makeLocalLoginRequest() {
	return new LocalLoginRequest()
}