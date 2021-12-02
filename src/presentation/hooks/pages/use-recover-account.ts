import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { makeLocalRecoverAccount } from "@/data/factories/recover-account-factory";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss";

type Errors = {
	emailErrors: string[];
	formErrors: string[];
}

const errorsInitialState: Errors = { emailErrors: [], formErrors: [] }

export function useRecoverAccount() {
	const [ email, setEmail ] = useState('')
	const [ errors, setErrors ] = useState(errorsInitialState)

	const recoverStyles = useMemo(() => ({
		boxStyles: classNames(styles.box),
		outerBox: classNames(styles.outerBox),
		buttons: classNames(styles.buttons)
	}), [])

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

		const recoverHandler = makeLocalRecoverAccount()

		const validationErrors = recoverHandler.validate({ email })

		if (validationErrors) {
			setErrors(validationErrors)
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
				return;
			}

			if (typeof err === "object") {
				const { formErrors } = err;
				setErrors(prevState => ({
					...prevState,
					formErrors
				}))

			}

			return;
		}

		console.log(response)

	}, [ email ])

	return {
		recoverStyles,
		email,
		onChangeEmail: onChange,
		onSubmit,
		errors,
		getErrorText
	}
}