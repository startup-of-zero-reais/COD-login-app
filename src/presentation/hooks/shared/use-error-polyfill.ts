import { Dispatch, SetStateAction, useCallback } from "react";
import { HandleRequestError } from "@/data/protocols/local-handler";
import { useSnackbarContext } from "@/presentation/contexts/snackbar-stack";

export function useErrorPolyfill() {
	const { openSnackbar } = useSnackbarContext()

	const getMessageIfExists = useCallback(( obj: object ) => {
		return Object.getOwnPropertyNames(obj).find(prop => prop === "message")
	}, [])

	const polyfill = useCallback(<T = any, S = any>( errs: HandleRequestError<T>, setErrors: Dispatch<SetStateAction<S>> ) => {
		if (errs) {
			if (typeof errs === "string") {
				setErrors(prevState => ({
					...prevState,
					formErrors: [ errs ]
				}))

				openSnackbar({
					type: "error",
					message: errs
				})

				return false
			}

			if (typeof errs === "object") {
				setErrors(prevState => ({
					...prevState,
					formErrors: errs
				}))

				openSnackbar({
					type: "error",
					message: errs instanceof Array && errs.length > 0
						? errs[0]
						: getMessageIfExists(errs)
							? getMessageIfExists(errs)
							: "Ocorreu um erro desconhecido"
				})
			}

			return false
		}

		return true
	}, [ getMessageIfExists, openSnackbar ])

	return {
		polyfill
	}
}