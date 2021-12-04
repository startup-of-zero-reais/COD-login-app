import { FieldValidator } from "@/validators/validation-protocol";

export class RequiredValidator implements FieldValidator {
	constructor( readonly key: string ) {
	}

	validate( value: any ): Error | null {
		if (!value || !value.length) {
			return new Error(`O campo ${ this.key } é um campo obrigatório`)
		}

		return null;
	}
}