import { HandleResponse, HandleValidationError, LocalHandler } from "@/data/protocols/local-handler";
import { ApiHandler } from "@/data/protocols/api-handler";
import { NextApiRequest, NextApiResponse } from "next";
import { LocalResponse } from "@/data/protocols/local-response";
import { ErrorProtocol } from "@/data/protocols/error-protocol";
import { localApi, usersApi } from "@/data/apis";
import { ValidatorBuilder, ValidatorComposite } from "@/validators";

type CreateAccountBody = {
	name: string;
	lastname: string;
	email: string;
	password: string;
	new_password: string;
}

interface CreateAccountErrors extends CreateAccountBody {
	form: string
}

export class LocalCreateAccount implements LocalHandler {
	private static hasErrors( err: string[] ): boolean {
		return err.length > 0
	}

	async handle( body: CreateAccountBody ): Promise<HandleResponse<CreateAccountBody, CreateAccountErrors>> {
		const { name, lastname, email, password, new_password } = body;

		const [ response, err ] = await localApi.post("/create-user", { name, lastname, email, password, new_password })
			.then(( { data } ) => [ data, null ])
			.catch(( e ) => [ e.message, e.response.data.message ])

		return [ response, err ]
	}

	validate( body: CreateAccountBody ): HandleValidationError<CreateAccountErrors> {
		const { name, lastname, email, password, new_password } = body;

		const emailErrors = ValidatorComposite.build(
			ValidatorBuilder.field("e-mail").required().email().build()
		).validate("e-mail", email)

		const passwordErrors = ValidatorComposite.build(
			ValidatorBuilder.field("senha").required().minLength(8).build()
		).validate("senha", password)

		const new_passwordErrors = ValidatorComposite.build(
			ValidatorBuilder.field("confirmação de senha").required().minLength(8).sameAs("senha", password).build()
		).validate("confirmação de senha", new_password)

		const nameErrors = ValidatorComposite.build(
			ValidatorBuilder.field("nome").required().minLength(3).build()
		).validate("nome", name)

		const lastnameErrors = ValidatorComposite.build(
			ValidatorBuilder.field("sobrenome").required().minLength(3).build()
		).validate("sobrenome", lastname)

		if (
			!LocalCreateAccount.hasErrors(emailErrors) &&
			!LocalCreateAccount.hasErrors(passwordErrors) &&
			!LocalCreateAccount.hasErrors(new_passwordErrors) &&
			!LocalCreateAccount.hasErrors(nameErrors) &&
			!LocalCreateAccount.hasErrors(lastnameErrors)
		) {
			return null
		}

		return {
			emailErrors,
			passwordErrors,
			new_passwordErrors,
			nameErrors: nameErrors,
			lastnameErrors,
			formErrors: [],
		};
	}
}

export class ApiCreateAccount implements ApiHandler {
	constructor( private readonly err: ErrorProtocol ) {
	}

	async handle<T = any>( req: NextApiRequest, res: NextApiResponse<LocalResponse<T>> ): Promise<void> {

		try {
			const { name, lastname, email, password, new_password } = req.body;

			const { data: response } = await usersApi.post("/users", {
				name, lastname, email, password, new_password
			})

			return res.status(201).json(response)
		} catch (e) {
			const { statusCode, message } = this.err
				.setErr(e)
				.getFinalResponse()

			return res.status(statusCode).json({
				message
			})
		}
	}
}