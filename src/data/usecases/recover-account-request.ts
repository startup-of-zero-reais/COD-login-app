import { HandleResponse, HandleValidationError, LocalHandler } from "@/data/protocols/local-handler";
import { ApiHandler } from "@/data/protocols/api-handler";
import { NextApiRequest, NextApiResponse } from "next";
import { LocalResponse } from "../protocols/local-response";
import { localApi, usersApi } from "@/data/apis";
import { ErrorProtocol } from "@/data/protocols/error-protocol";
import { ValidatorBuilder, ValidatorComposite } from "@/validators";

type RecoverAccountBody = {
	email: string
}

interface RecoverAccountErrors extends RecoverAccountBody {
	form: string
}

export class LocalRecoverAccountRequest implements LocalHandler {

	async handle( body: RecoverAccountBody ): Promise<HandleResponse<RecoverAccountBody, RecoverAccountErrors>> {
		const { email } = body;

		const [ response, err ] = await localApi.post<RecoverAccountBody>("/recover-account", { email })
			.then(( { data } ) => [ data, null ])
			.catch(e => [ e.message, e.response.data.message ])

		return [ response, err ]
	}

	validate( body: RecoverAccountBody ): HandleValidationError<RecoverAccountErrors> {
		const { email } = body;

		const emailErrors = ValidatorComposite.build(
			ValidatorBuilder.field("E-mail").required().email().build()
		).validate("E-mail", email)

		if (!emailErrors.length) {
			return null
		}

		return {
			formErrors: [],
			emailErrors: emailErrors
		};
	}
}

export class ApiRecoverAccountRequest implements ApiHandler {
	constructor( private readonly recoverError: ErrorProtocol ) {
	}

	async handle<T = any>( req: NextApiRequest, res: NextApiResponse<LocalResponse<T>> ): Promise<void> {
		const { email } = req.body

		try {
			const { data: response } = await usersApi.post("/recover-account", { email })

			return res.status(200).json(response)
		} catch (e) {
			const { statusCode, message } = this.recoverError
				.setErr(e)
				.getFinalResponse()

			return res.status(statusCode).json({
				message
			})
		}
	}
}