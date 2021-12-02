import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { makeLocalRecoverAccount } from "@/data/factories/recover-account-factory";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { useLoading } from "@/presentation/hooks";

type Errors = {
	emailErrors: string[];
	formErrors: string[];
}

const errorsInitialState: Errors = { emailErrors: [], formErrors: [] }

export function useRecoverAccount() {
	const recoverStyles = useMemo(() => ({
		boxStyles: classNames(styles.box),
		outerBox: classNames(styles.outerBox),
		buttons: classNames(styles.buttons)
	}), [])

	const [ email, setEmail ] = useState('')
	const [ errors, setErrors ] = useState(errorsInitialState)
	const { isLoading, startLoading, endLoading } = useLoading()

	const onChange = useCallback(( e: ChangeEvent<HTMLInputElement> ) => {
		setEmail(e.target.value)
	}, [])

	const getErrorText = useCallback(( errors: string[] ) => {
		if (errors.length) {
			return errors[0]
		}

		return ""
	}, [])

	const onSubmit = useCallback(async ( e: FormEvent ) => {
		e.preventDefault()
		startLoading()

		const recoverHandler = makeLocalRecoverAccount()

		const validationErrors = recoverHandler.validate({ email })

		if (validationErrors) {
			setErrors(validationErrors)
			endLoading()
			return;
		}

		setErrors(errorsInitialState)

		const [ response, err ] = await recoverHandler.handle({ email })

		if (err) {
			if (typeof err === "string") {
				setErrors({
					emailErrors: [],
					formErrors: [ err ]
				})
				endLoading()
				return;
			}

			if (typeof err === "object") {
				const { formErrors } = err;
				setErrors(prevState => ({
					...prevState,
					formErrors
				}))

			}

			endLoading()
			return;
		}

		console.log(response)
		endLoading()
	}, [ email, startLoading, endLoading ])

	const isDisabled = useMemo(() => (email.length < 3 || !email.match(/@/gi)), [ email ])

	return {
		recoverStyles,
		email,
		onChangeEmail: onChange,
		onSubmit,
		errors,
		getErrorText,
		isLoading,
		isDisabled
	}
}