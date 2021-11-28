export function executeOnClient<T extends Function>( callback: T ): T {
	if (!(window && window.localStorage)) {
		throw new Error("Não está do lado do cliente")
	}

	return callback
}