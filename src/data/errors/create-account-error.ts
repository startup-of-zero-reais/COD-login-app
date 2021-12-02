import { BaseErrorHandler } from "@/data/errors/base-error-handler";
import { ErrorProtocol, FinalResponse } from "@/data/protocols/error-protocol";

export class CreateAccountError extends BaseErrorHandler implements ErrorProtocol {
	getMessage(): string {
		switch (super.getMessage()) {
			case "socket hang up":
				return "Socket de conexão desligado (hang up)"
			case "erro de validação":
				return "Erro de validação, algum dos dados está incorreto"
			case "usuário já cadastrado":
				return "Um usuário com este e-mail já está cadastrado"
			default:
				return super.getMessage()
		}
	}

	getFinalResponse(): FinalResponse {
		return {
			statusCode: super.getStatus(),
			message: this.getMessage()
		}
	}

}