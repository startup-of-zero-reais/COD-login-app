import { FieldValidator } from "@/validators/validation-protocol";

export class EmailValidator implements FieldValidator {
	constructor( readonly key: string ) {
	}

	validate( value: any ): Error | null {
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
		if (!emailRegex.test(value)) {
			return new Error(`O campo ${ this.key } não é um e-mail válido`)
		}

		return null
	}
}