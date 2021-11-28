import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { useStorage } from "@/presentation/hooks/use-storage";
import { ValidatorBuilder, ValidatorComposite } from "@/validators";
import { localApi } from "@/data/apis";

type Errors = {
	email: string[];
	password: string[];
	form: string[];
}

export function useLoginPage() {
	const [ isPasswordVisible, setPasswordVisible ] = useState(false);
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ isDisabled, setIsDisabled ] = useState(true)
	const [ errors, setErrors ] = useState<Errors>({ email: [], password: [], form: [] })

	const [ shouldRemember, setShouldRemember ] = useStorage("still-connected", false)

	const togglePasswordVisibility = useCallback(() => {
		setPasswordVisible(prevState => !prevState)
	}, [])

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

		const emailErrors = ValidatorComposite.build(
			ValidatorBuilder.field("E-mail").required().email().build()
		).validate("E-mail", email)

		const passwordErrors = ValidatorComposite.build(
			ValidatorBuilder.field("Senha").required().minLength(6).build()
		).validate("Senha", password)

		setErrors({
			email: emailErrors,
			password: passwordErrors,
			form: []
		})

		if (emailErrors.length > 0 || passwordErrors.length > 0) {
			console.log("Ainda tem erro", emailErrors, passwordErrors)
			return;
		}

		const [ response, err ] = await localApi.post("/login", { email, password })
			.then(( { data } ) => [ data, null ])
			.catch(err => [ err.message, err.response.data.message ])

		if (err) {
			setErrors(prevState => ({
				...prevState,
				form: [ err ]
			}))
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
		isPasswordVisible,
		togglePasswordVisibility,
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