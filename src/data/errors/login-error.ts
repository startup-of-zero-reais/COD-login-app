import { ErrorProtocol, FinalResponse } from "@/data/protocols/error-protocol";
import { BaseErrorHandler } from "@/data/errors/base-error-handler";

export class LoginErrors extends BaseErrorHandler implements ErrorProtocol {
	translateMessage(): string {
		switch (this.getMessage()) {
			case "Unauthorized":
			default:
				return "Credenciais inválidas"
		}
	}

	getFinalResponse(): FinalResponse {
		return {
			statusCode: this.getStatus(),
			message: this.translateMessage()
		}
	}
}