import { Dispatch, SetStateAction, useCallback } from "react";
import { HandleRequestError } from "@/data/protocols/local-handler";

export function useErrorPolyfill() {
	const polyfill = useCallback(<T = any, S = any>( errs: HandleRequestError<T>, setErrors: Dispatch<SetStateAction<S>> ) => {
		if (errs) {
			if (typeof errs === "string") {
				setErrors(prevState => ({
					...prevState,
					formErrors: [ errs ]
				}))

				return false
			}

			if (typeof errs === "object") {
				setErrors(prevState => ({
					...prevState,
					formErrors: errs
				}))

			}

			return false
		}

		return true
	}, [])

	return {
		polyfill
	}
}