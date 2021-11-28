import { NextApiRequest, NextApiResponse } from "next";
import { usersApi } from "@/data/apis";
import { AxiosError } from "axios";

type Data = {
	token: string;
	user: {
		name: string;
	}
} | { message: string }

type LoginResponse = {
	token: string;
	user: {
		name: string;
	}
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
	const { email, password } = req.body

	try {
		const { data: response } = await usersApi.post<LoginResponse>("/auth", JSON.stringify({
			email,
			password
		}))

		return res.status(200).json(response)
	} catch (e) {
		const err = new LoginErrors(e as any);

		const { statusCode, message } = err.getFinalResponse()

		return res.status(statusCode).json({
			message
		})
	}
}

class LoginErrors {
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