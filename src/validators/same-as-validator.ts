import { FieldValidator } from "@/validators/validation-protocol";

export class SameAsValidator implements FieldValidator {
	constructor( readonly key: string, readonly toCompare: any, readonly toCompareKey: string ) {
	}

	validate( value: any ): Error | null {
		if (this.toCompare !== value) {
			return new Error(`O campo ${ this.key } não é igual à ${ this.toCompareKey } `)
		}

		return null
	}
}