export interface FieldValidator {
	key: string

	validate( value: any ): Error | null
}