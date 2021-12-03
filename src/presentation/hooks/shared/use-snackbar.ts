import { useCallback, useEffect, useState } from "react";

type UseSnackbarReturnType = [ boolean, () => void, () => void ]

export function useSnackbar(): UseSnackbarReturnType {
	const [ open, setOpen ] = useState(false)

	const onOpen = useCallback(() => {
		setOpen(true)
	}, [])

	const onClose = useCallback(() => {
		setOpen(false)
	}, [])

	useEffect(() => {
		let timeout = setTimeout(() => onClose(), 6000)

		return () => {
			clearTimeout(timeout)
		}
	}, [ onClose ])

	return [ open, onOpen, onClose ]
}