import { ApiCreateAccount, LocalCreateAccount } from "@/data/usecases/create-account-request";
import { CreateAccountError } from "@/data/errors/create-account-error";

export function makeApiCreateAccount() {
	const createError = new CreateAccountError()
	return new ApiCreateAccount(createError)
}

export function makeLocalCreateAccount() {
	return new LocalCreateAccount()
}