import { useCallback, useState } from "react";

export function useLoading( initialState = false ) {
	const [ isLoading, setIsLoading ] = useState(initialState)

	const startLoading = useCallback(() => {
		setIsLoading(true)
	}, [])

	const endLoading = useCallback(() => {
		setIsLoading(false)
	}, [])

	return {
		isLoading,
		startLoading,
		endLoading
	}
}