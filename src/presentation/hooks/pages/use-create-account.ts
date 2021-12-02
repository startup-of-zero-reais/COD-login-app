import { ChangeEvent, FormEvent, useCallback, useMemo, useReducer, useState } from "react";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { makeLocalCreateAccount } from "@/data/factories/create-account-factory";
import { useErrorPolyfill, useLoading } from "@/presentation/hooks";
import { useRouter } from "next/router";

type CreateAccountStates = {
	name: string;
	lastname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const initialState: CreateAccountStates = {
	name: '',
	lastname: '',
	email: '',
	password: '',
	confirmPassword: '',
}

type Errors = {
	nameErrors: string[]
	lastnameErrors: string[]
	emailErrors: string[]
	passwordErrors: string[]
	new_passwordErrors: string[]
	formErrors: string[]
}

const errorsInitialState: Errors = {
	nameErrors: [],
	lastnameErrors: [],
	emailErrors: [],
	passwordErrors: [],
	new_passwordErrors: [],
	formErrors: [],
}

export function useCreateAccount() {
	const createAccountStyles = useMemo(() => ({
		boxStyles: classNames(styles.box),
		outerBox: classNames(styles.outerBox),
		formStyles: classNames(styles.form),
		buttons: classNames(styles.buttons),
	}), [])

	const { replace } = useRouter()

	const [ state, dispatch ] = useReducer(createAccountReducer, initialState)
	const { polyfill } = useErrorPolyfill()
	const [ errors, setErrors ] = useState(errorsInitialState)
	const { isLoading, startLoading, endLoading } = useLoading()

	const onChange = useCallback(( field: Actions['type'] ) => {
		return ( e: ChangeEvent<HTMLInputElement> ) => {
			const payload = e.target.value
			dispatch({ type: field, payload })
		}
	}, [])

	const getError = useCallback(( errors: string[] ) => {
		if (errors.length > 0) {
			return errors[0]
		}

		return ""
	}, [])

	const onSubmit = useCallback(async ( e: FormEvent ) => {
		e.preventDefault()
		startLoading()

		const body = {
			name: state.name,
			lastname: state.lastname,
			email: state.email,
			password: state.password,
			new_password: state.confirmPassword
		}

		const createHandler = makeLocalCreateAccount()
		const validationErrors = createHandler.validate(body)

		if (validationErrors) {
			setErrors(validationErrors)
			endLoading()
			return;
		}

		setErrors(errorsInitialState)

		const [ , err ] = await createHandler.handle(body)

		const hasNotError = polyfill(err, setErrors)
		if (!hasNotError) {
			endLoading()
			return;
		}

		endLoading()
		await replace("/conta-criada")
	}, [ state, polyfill, startLoading, endLoading, replace ])

	return {
		createAccountStyles,
		state,
		onChangeName: onChange('change-name'),
		onChangeLastname: onChange('change-lastname'),
		onChangeEmail: onChange('change-email'),
		onChangePassword: onChange('change-password'),
		onChangeConfirmPassword: onChange('change-confirmPassword'),
		onSubmit,
		errors,
		getError,
		isLoading
	}
}

type Action<T extends string> = {
	type: T
	payload: string
}

type ChangeNameAction = Action<'change-name'>
type ChangeLastnameAction = Action<'change-lastname'>
type ChangeEmailAction = Action<'change-email'>
type ChangePasswordAction = Action<'change-password'>
type ChangeConfirmPasswordAction = Action<'change-confirmPassword'>

type Actions =
	ChangeNameAction
	| ChangeLastnameAction
	| ChangeEmailAction
	| ChangePasswordAction
	| ChangeConfirmPasswordAction;

function createAccountReducer( state: CreateAccountStates, action: Actions ): CreateAccountStates {
	const changeField = action.type.replace(/(change-)/gi, '');

	if (!changeField) {
		return state
	}

	return {
		...state,
		[changeField]: action.payload
	}
}