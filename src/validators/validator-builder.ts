import { EmailValidator } from "@/validators/email-validator";
import { FieldValidator } from "@/validators/validation-protocol";
import { MinLengthValidator } from "@/validators/min-length-validator";
import { SameAsValidator } from "@/validators/same-as-validator";
import { RequiredValidator } from "@/validators/required-validator";
import { UuidValidator } from "@/validators/uuid-validator";

export class ValidatorBuilder {
	constructor(
		private readonly key: string,
		private readonly validators: FieldValidator[]
	) {
	}

	static field( key: string ): ValidatorBuilder {
		return new ValidatorBuilder(key, [])
	}

	required() {
		const validator = new RequiredValidator(this.key)
		this.validators.push(validator)
		return this;
	}

	email() {
		const validator = new EmailValidator(this.key)
		this.validators.push(validator)
		return this
	}

	minLength( length: number ) {
		const validator = new MinLengthValidator(this.key, length)
		this.validators.push(validator)
		return this
	}

	sameAs( key: string, value: any ) {
		const validator = new SameAsValidator(this.key, value, key)
		this.validators.push(validator)
		return this
	}

	uuid() {
		const validator = new UuidValidator(this.key)
		this.validators.push(validator)
		return this
	}

	build(): FieldValidator[] {
		return this.validators
	}
}