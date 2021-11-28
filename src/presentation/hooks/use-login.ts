import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { useStorage } from "@/presentation/hooks/use-storage";
import { ValidatorBuilder, ValidatorComposite } from "@/validators";

type Errors = {
	email: string[];
	password: string[];
}

export function useLoginPage() {
	const [ isPasswordVisible, setPasswordVisible ] = useState(false);
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ isDisabled, setIsDisabled ] = useState(true)

	const [ errors, setErrors ] = useState<Errors>({ email: [], password: [] })

	const [ shouldRemember, setShouldRemember ] = useStorage("still-connected", false)

	const togglePasswordVisibility = useCallback(() => {
		setPasswordVisible(prevState => !prevState)
	}, [])

	const onChangeEmail = useCallback(( e: ChangeEvent<HTMLInputElement> ) => {
		setEmail(e.target.value)
	}, [])

	const onChangePassword = useCallback(( e: ChangeEvent<HTMLInputElement> ) => {
		setPassword(e.target.value)
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

	const onSubmit = useCallback(( e: FormEvent ) => {
		e.preventDefault()

		const emailErrors = ValidatorComposite.build(
			ValidatorBuilder.field("E-mail").required().email().build()
		).validate("E-mail", email)

		const passwordErrors = ValidatorComposite.build(
			ValidatorBuilder.field("Senha").required().minLength(8).build()
		).validate("Senha", password)

		setErrors({
			email: emailErrors,
			password: passwordErrors
		})

		if (emailErrors.length > 0 || passwordErrors.length > 0) {
			console.log("Ainda tem erro", emailErrors, passwordErrors)
			return;
		}

		console.log(email, password)
	}, [ email, password ]);

	useEffect(() => {
		if (email && password) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [ email, password ])

	return {
		isPasswordVisible,
		togglePasswordVisibility,
		loginStyles,
		shouldRemember,
		setShouldRemember,
		onSubmit,
		onChangeEmail,
		onChangePassword,
		isDisabled,
		errors,
		getErrorText
	}
}