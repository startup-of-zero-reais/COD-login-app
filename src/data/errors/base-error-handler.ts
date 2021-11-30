import { AxiosError } from "axios";
import { ErrorProtocol, FinalResponse } from "@/data/protocols/error-protocol";

export class BaseErrorHandler implements ErrorProtocol {
	protected err: AxiosError = {} as any

	setErr( err: AxiosError ): ErrorProtocol {
		this.err = err
		return this;
	}

	getStatus(): number {
		return this.err.response?.status || 500
	}

	getMessage(): string {
		return this.err.response?.data.message || "Não autorizado"
	}

	getFinalResponse(): FinalResponse {
		return {
			statusCode: this.getStatus(),
			message: this.getMessage()
		}
	}
}