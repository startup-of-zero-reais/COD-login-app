import { FieldValidator } from "@/validators/validation-protocol";

export class UuidValidator implements FieldValidator {
	constructor( readonly key: string ) {
	}

	validate( value: string ): Error | null {
		const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
		if (!uuidRegex.test(value)) {
			return new Error(`O ${ this.key } não é um UUID válido`)
		}
		
		return null;
	}
}