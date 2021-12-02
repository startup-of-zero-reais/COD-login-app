import { useCallback, useState } from "react";

export function usePasswordToggle() {
	const [ isPasswordVisible, setPasswordVisible ] = useState(false);

	const togglePasswordVisibility = useCallback(() => {
		setPasswordVisible(prevState => !prevState)
	}, [])

	return {
		isPasswordVisible,
		togglePasswordVisibility
	}

}