export type ErrorMessage = { message: string }

export type HandleRequestError<T> =
	(T extends ErrorMessage ? ErrorMessage : T extends string ? string : HandleValidationError<T>)
	| null

type ErrorKey<T extends string> = `${ T }Errors`;

export type HandleValidationError<T> = {
	[K in keyof T extends string ? ErrorKey<keyof T> : never]: string[]
} | null

export type HandleResponse<T, Er> = [ T | null, HandleRequestError<Er> ]

export interface LocalHandler {
	handle( body: any ): Promise<HandleResponse<any, any>>

	validate( body: any ): HandleValidationError<any>
}