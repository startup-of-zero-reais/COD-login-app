import { AxiosError } from "axios";
import { ErrorProtocol, FinalResponse } from "@/data/protocols/error-protocol";

export class LoginErrors implements ErrorProtocol {
	private err: AxiosError = {} as any;

	setErr( err: AxiosError ): ErrorProtocol {
		this.err = err
		return this
	}

	getStatus(): number {
		return this.err.response?.status || 500
	}

	getMessage(): string {
		return this.err.response?.data.message || "Não autorizado"
	}

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