import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { useStorage } from "@/presentation/hooks/pages/use-storage";
import { makeLocalLoginRequest } from "@/data/factories/login-factory";

type Errors = {
	email: string[];
	password: string[];
	form: string[];
}

const errorsInitialState = { email: [], password: [], form: [] }

export function useLoginPage() {
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ isDisabled, setIsDisabled ] = useState(true)
	const [ errors, setErrors ] = useState<Errors>(errorsInitialState)

	const [ shouldRemember, setShouldRemember ] = useStorage("still-connected", false)

	const onChange = useCallback(( key: "email" | "password" ) => ( e: ChangeEvent<HTMLInputElement> ) => {
		if (key === "email") {
			setEmail(e.target.value)
		}

		if (key === "password") {
			setPassword(e.target.value)
		}
	}, [])

	const getErrorText = useCallback(( errors: string[] ) => {
		if (errors.length) {
			return errors[0]
		}

		return ""
	}, [])

	const loginStyles = useMemo(() => ({
		boxStyles: classNames(styles.box),
		outerBox: classNames(styles.outerBox),
		formStyles: classNames(styles.form),
		bottomForm: classNames(styles.bottomForm),
		buttons: classNames(styles.buttons),
	}), [])

	const onSubmit = useCallback(async ( e: FormEvent ) => {
		e.preventDefault()

		const loginHandler = makeLocalLoginRequest()

		const errors = loginHandler.validate({ email, password })

		if (errors) {
			const { emailErrors, passwordErrors, formErrors } = errors;

			setErrors({
				email: emailErrors,
				password: passwordErrors,
				form: formErrors
			})

			return;
		}

		setErrors(errorsInitialState)

		const [ response, err ] = await loginHandler.handle({ email, password })

		if (err) {
			if (typeof err === "string") {
				setErrors(prevState => ({
					...prevState,
					form: [ err ]
				}))

				return;
			}

			if (typeof err === "object") {
				const { formErrors } = err;
				setErrors(prevState => ({
					...prevState,
					form: formErrors
				}))
			}

			return;
		}

		console.log(response)
	}, [ email, password ]);

	useEffect(() => {
		if (email && password) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [ email, password ])

	return {
		loginStyles,
		shouldRemember,
		setShouldRemember,
		onSubmit,
		onChangeEmail: onChange("email"),
		onChangePassword: onChange("password"),
		isDisabled,
		errors,
		getErrorText
	}
}