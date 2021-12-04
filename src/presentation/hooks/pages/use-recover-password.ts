import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { useErrorPolyfill, useLoading } from "@/presentation/hooks";
import { makeLocalRecoverPassword } from "@/data/factories/recover-password-factory";
import { useRouter } from "next/router";
import { useSnackbarContext } from "@/presentation/contexts/snackbar-stack";

type Errors = {
	new_passwordErrors: string[]
	new_password_confirmationErrors: string[]
	tokenErrors: string[]
	formErrors: string[]
}

const errorsInitialState: Errors = {
	new_passwordErrors: [],
	new_password_confirmationErrors: [],
	tokenErrors: [],
	formErrors: [],
}

export function useRecoverPassword() {
	const recoverPasswordStyles = useMemo(() => ({
		outerBox: classNames(styles.outerBox),
		boxStyles: classNames(styles.box),
		formStyles: classNames(styles.form),
		buttons: classNames(styles.buttons)
	}), [])

	const { query, push } = useRouter()
	const { token = '' } = query as { token?: string }

	const { isLoading, startLoading, endLoading } = useLoading()
	const { polyfill } = useErrorPolyfill()
	const { openSnackbar } = useSnackbarContext()

	const [ password, setPassword ] = useState('')
	const [ new_password, set_new_password ] = useState('')
	const [ isDisabled, setIsDisabled ] = useState(true)
	const [ errors, setErrors ] = useState(errorsInitialState)

	const onChange = useCallback(( field: 'password' | 'new_password' ) => ( e: ChangeEvent<HTMLInputElement> ) => {
		if (field === 'password') {
			setPassword(e.target.value)
		}

		if (field === 'new_password') {
			set_new_password(e.target.value)
		}
	}, [])

	const getErrors = useCallback(( fieldErrors: string[] ) => {
		if (fieldErrors.length > 0) {
			return fieldErrors[0]
		}

		return ""
	}, [])

	const onSubmit = useCallback(async ( e: FormEvent ) => {
		e.preventDefault()
		startLoading()

		const handler = makeLocalRecoverPassword()

		const body = {
			new_password: password,
			new_password_confirmation: new_password,
			token,
		}

		const validationErrs = handler.validate(body)

		if (validationErrs) {
			setErrors(validationErrs)

			if (validationErrs.tokenErrors.length > 0) {
				openSnackbar({
					type: "error",
					message: validationErrs.tokenErrors[0]
				})
			}

			endLoading()
			return;
		}

		setErrors(errorsInitialState)

		const [ response, err ] = await handler.handle(body)

		const hasNoErrors = polyfill(err, setErrors)
		if (!hasNoErrors) {
			openSnackbar({
				type: 'error',
				message: err?.message || "Ocorreu um erro"
			})
			endLoading()
			return;
		}

		endLoading()
		openSnackbar({
			type: "success",
			message: response!.message
		})

		setTimeout(async () => {
			await push('/')
		}, 5000)
	}, [ startLoading, password, new_password, token, polyfill, endLoading, openSnackbar, push ])

	useEffect(() => {
		const minPasswordLength = 6

		if (password.length >= minPasswordLength && new_password.length >= minPasswordLength) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [ password, new_password ])

	return {
		recoverPasswordStyles,
		onSubmit,
		onChangePassword: onChange('password'),
		onChangeNewPassword: onChange('new_password'),
		isLoading,
		isDisabled,
		errors,
		getErrors,
	}
}