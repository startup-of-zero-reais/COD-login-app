import { FieldValidator } from "@/validators/validation-protocol";

export class MinLengthValidator implements FieldValidator {
	constructor( readonly key: string, readonly minLength: number ) {
	}

	validate( value: any ): Error | null {
		if (!value || value.length < this.minLength) {
			return new Error(`O campo ${ this.key } possui menos de ${ this.minLength } caracteres`)
		}
		return null;
	}
}