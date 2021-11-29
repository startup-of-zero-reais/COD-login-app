import { AxiosError } from "axios";

export class LoginErrors {
	constructor( private readonly err: AxiosError ) {
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

	getFinalResponse(): { statusCode: number; message: string } {
		return {
			statusCode: this.getStatus(),
			message: this.translateMessage()
		}
	}
}