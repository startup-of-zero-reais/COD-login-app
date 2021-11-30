import { AxiosError } from "axios";

export type FinalResponse = {
	statusCode: number;
	message: string;
}

export interface ErrorProtocol {
	setErr( err: AxiosError | unknown ): ErrorProtocol

	getFinalResponse(): FinalResponse
}