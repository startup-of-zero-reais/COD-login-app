import { useCallback, useEffect, useState } from "react";
import { executeOnClient } from "@/presentation/utils";

const storageKey = "@/code-craft/"

function mountKey( key: string ): string {
	return storageKey + key
}

type StorageReturn<T> = [ T, ( newState: T ) => void ];

export function useStorage<T>( key: string, initialState: T ): StorageReturn<T> {
	const [ state, setState ] = useState(initialState)

	const setStorageState = useCallback(( newState ) => {
		setState(newState)

		if (window && window.localStorage) {
			localStorage.setItem(mountKey(key), JSON.stringify(newState))
		}
	}, [ key ])

	const getFromStorage = useCallback(() => {
		return executeOnClient(() => {
			const storageItem = localStorage.getItem(mountKey(key))

			if (storageItem) {
				return (JSON.parse(storageItem) as T)
			}

			return initialState
		})()
	}, [ initialState, key ])

	useEffect(() => {
		setState(getFromStorage())
	}, [ getFromStorage, initialState, key, state ])

	return [
		state,
		setStorageState
	]
}