import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { useStorage } from "@/presentation/hooks/pages/use-storage";
import { makeLocalLoginRequest } from "@/data/factories/login-factory";
import { useErrorPolyfill, useLoading } from "@/presentation/hooks";
import { useSnackbarContext } from "@/presentation/contexts/snackbar-stack";

type Errors = {
	emailErrors: string[];
	passwordErrors: string[];
	formErrors: string[];
}

const errorsInitialState = { emailErrors: [], passwordErrors: [], formErrors: [] }

export function useLoginPage() {
	const loginStyles = useMemo(() => ({
		boxStyles: classNames(styles.box),
		outerBox: classNames(styles.outerBox),
		formStyles: classNames(styles.form),
		bottomForm: classNames(styles.bottomForm),
		buttons: classNames(styles.buttons),
	}), [])

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ isDisabled, setIsDisabled ] = useState(true)
	const [ errors, setErrors ] = useState<Errors>(errorsInitialState)

	const { isLoading, startLoading, endLoading } = useLoading()
	const { polyfill } = useErrorPolyfill()
	const { openSnackbar } = useSnackbarContext()

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

	const onSubmit = useCallback(async ( e: FormEvent ) => {
		e.preventDefault()
		startLoading()

		const loginHandler = makeLocalLoginRequest()

		const errors = loginHandler.validate({ email, password })

		if (errors) {
			setErrors(errors)
			endLoading()
			return;
		}

		setErrors(errorsInitialState)

		const [ , err ] = await loginHandler.handle({ email, password })

		const hasNoErrors = polyfill(err, setErrors)

		if (!hasNoErrors) {
			openSnackbar({
				type: "error",
				message: err?.message || "Ocorreu um erro"
			})
			endLoading()
			return;
		}

		endLoading()
	}, [ startLoading, email, password, polyfill, endLoading, openSnackbar ]);

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
		getErrorText,
		isLoading
	}
}