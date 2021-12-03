import { HandleResponse, HandleValidationError, LocalHandler } from "@/data/protocols/local-handler";
import { ApiHandler } from "@/data/protocols/api-handler";
import { NextApiRequest, NextApiResponse } from "next";
import { LocalResponse } from "@/data/protocols/local-response";
import { ErrorProtocol } from "@/data/protocols/error-protocol";
import { localApi, usersApi } from "@/data/apis";
import { ValidatorBuilder, ValidatorComposite } from "@/validators";

type RecoverPasswordBody = {
	new_password: string;
	new_password_confirmation: string;
	token: string;
}

interface RecoverPasswordErrors extends RecoverPasswordBody {
	form: string
}

export class LocalRecoverPassword implements LocalHandler {
	private static hasBodyErrors( ...errorItems: string[][] ): boolean {
		return Object.values(errorItems).map(( v: string[] ) => v.length > 0).filter(currValue => currValue).length > 0
	}

	async handle( body: RecoverPasswordBody ): Promise<HandleResponse<RecoverPasswordBody, RecoverPasswordErrors>> {
		const { new_password, new_password_confirmation, token } = body;

		const [ res, err ] = await localApi.post(`/recover-password?token=${ token }`, {
			new_password,
			new_password_confirmation
		})
			.then(( { data } ) => [ data, null ])
			.catch(e => [ null, e.response.data.message || e.message ])

		return [ res, err ]
	}

	validate( body: RecoverPasswordBody ): HandleValidationError<RecoverPasswordErrors> {
		const { new_password, new_password_confirmation, token } = body;

		const new_passwordErrors = ValidatorComposite.build(
			ValidatorBuilder.field('senha').required().minLength(8).build()
		).validate('senha', new_password)

		const new_password_confirmationErrors = ValidatorComposite.build(
			ValidatorBuilder.field('confirmação de senha').required().minLength(8).sameAs('senha', new_password).build()
		).validate('confirmação de senha', new_password_confirmation)

		const tokenErrors = ValidatorComposite.build(
			ValidatorBuilder.field('token').required().uuid().build()
		).validate('token', token)

		if (LocalRecoverPassword.hasBodyErrors(
			new_passwordErrors,
			new_password_confirmationErrors,
			tokenErrors
		)) {
			return {
				new_passwordErrors,
				new_password_confirmationErrors,
				tokenErrors,
				formErrors: []
			}
		}

		return null;
	}
}

export class ApiRecoverPassword implements ApiHandler {
	constructor( private readonly err: ErrorProtocol ) {
	}

	async handle<T = any>( req: NextApiRequest, res: NextApiResponse<LocalResponse<T>> ): Promise<void> {
		const { new_password, new_password_confirmation } = req.body

		if (!req.query.token) {
			return res.status(403).json({
				message: 'Redefinição de senha não permitida'
			})
		}

		const { token } = req.query

		try {
			const { data: response } = await usersApi.post(`/recover-account/update-password?token=${ token }`, {
				new_password,
				new_password_confirmation
			})

			return res.status(200).json(response)
		} catch (e) {
			const { statusCode, message } = this.err
				.setErr(e)
				.getFinalResponse()

			return res.status(statusCode).json({ message })
		}
	}
}