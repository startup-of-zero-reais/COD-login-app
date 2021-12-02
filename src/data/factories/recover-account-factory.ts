import { ApiRecoverAccountRequest, LocalRecoverAccountRequest } from "@/data/usecases/recover-account-request";
import { RecoverAccountError } from "@/data/errors/recover-account-error";

export function makeLocalRecoverAccount() {
	return new LocalRecoverAccountRequest()
}

export function makeApiRecoverAccount() {
	const recoverErr = new RecoverAccountError()
	return new ApiRecoverAccountRequest(recoverErr)
}