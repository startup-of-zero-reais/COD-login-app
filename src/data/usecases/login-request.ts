import { NextApiRequest, NextApiResponse } from "next";
import { localApi, usersApi } from "@/data/apis";
import { LocalResponse } from "@/data/protocols/local-response";
import { LoginErrors } from "@/data/errors/login-error";
import { ApiHandler } from "@/data/protocols/api-handler";
import { HandleResponse, HandleValidationError, LocalHandler } from "@/data/protocols/local-handler";
import { ValidatorBuilder, ValidatorComposite } from "@/validators";

type LoginBody = {
	email: string;
	password: string;
}

type LoginErrorBody = {
	email: string;
	password: string;
	form: string;
}

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
	validate( body: LoginBody ): HandleValidationError<LoginErrorBody> {
		const { email, password } = body;

		const emailErrors = ValidatorComposite.build(
			ValidatorBuilder.field("E-mail").required().email().build()
		).validate("E-mail", email)

		const passwordErrors = ValidatorComposite.build(
			ValidatorBuilder.field("Senha").required().minLength(6).build()
		).validate("Senha", password)

		if (emailErrors.length > 0 || passwordErrors.length > 0) {
			return {
				emailErrors,
				passwordErrors,
				formErrors: []
			};
		}

		return null
	}

	public async handle( body: LoginBody ): Promise<HandleResponse<LoginBody, LoginErrorBody>> {
		const { email, password } = body;

		const [ response, requestErr ] = await localApi.post<LoginResponse>("/login", { email, password })
			.then(( { data } ) => [ data, null ])
			.catch(err => [ err.message, err.response.data.message ])

		return [ response, requestErr ]
	}
}

export class ApiLoginRequest implements ApiHandler {
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
