import { NextApiRequest, NextApiResponse } from "next";
import { usersApi } from "@/data/apis";
import { LocalResponse } from "@/data/protocols/local-response";
import { LoginErrors } from "@/data/errors/login-error";
import { LocalHandler } from "@/data/protocols/local-handler";

type LoginResponse = {
	token: string;
	user: {
		id: string;
		name: string;
		lastname: string;
		email: string;
	}
}

export class LocalLoginRequest implements LocalHandler {
	public async handle<T = LoginResponse>( req: NextApiRequest, res: NextApiResponse<LocalResponse<T>> ) {
		const { email, password } = req.body

		try {
			const { data: response } = await usersApi.post<T>("/auth", JSON.stringify({
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
}
