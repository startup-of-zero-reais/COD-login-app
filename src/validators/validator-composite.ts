import { FieldValidator } from "@/validators/validation-protocol";

export class ValidatorComposite {

	constructor( private readonly validators: FieldValidator[] ) {
	}

	static build( validators: FieldValidator[] ): ValidatorComposite {
		return new ValidatorComposite(validators)
	}

	validate( key: string, value: any ): string[] {
		const validators = this.validators.filter(
			currentValidator => currentValidator.key === key
		)

		const errors: string[] = []

		for (const validator of validators) {
			const error = validator.validate(value)

			if (error) errors.push(error.message)
		}

		return errors;
	}

}