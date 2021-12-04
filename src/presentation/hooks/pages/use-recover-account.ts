import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { makeLocalRecoverAccount } from "@/data/factories/recover-account-factory";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { useErrorPolyfill, useLoading } from "@/presentation/hooks";
import { useSnackbarContext } from "@/presentation/contexts/snackbar-stack";

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
	const { polyfill } = useErrorPolyfill()
	const { replace } = useRouter()
	const { openSnackbar } = useSnackbarContext()

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

		const [ , err ] = await recoverHandler.handle({ email })

		const hasNotErrors = polyfill(err, setErrors)

		if (!hasNotErrors) {
			openSnackbar({
				type: "error",
				message: err?.message || "Ocorreu um erro"
			})
			endLoading()
			return;
		}

		endLoading()
		await replace("/")
	}, [ startLoading, email, polyfill, endLoading, replace, openSnackbar ])

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