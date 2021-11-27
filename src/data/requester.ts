type DoubleResponse<T> = [ T, (Error | null) ];
type Pagination = {
	page: string,
	per_page: string
}

class Requester {
	private baseURL: string = ""

	constructor( baseURL = "" ) {
		this.baseURL = baseURL
	}

	private makeURL( path: string, pagination: Pagination ): URL {
		const params = new URLSearchParams(pagination)
		return new URL(path + "?" + params.toString(), this.baseURL)
	}

	async get<T = any>( path: string, pagination: Pagination ): Promise<DoubleResponse<T>> {
		const url = this.makeURL(path, pagination)
		console.log({url})
		return await fetch(url.toString())
			.then(r => r.json())
			.then(json => [ json, null ] as DoubleResponse<T>)
			.catch(( e: Error | null ) => [ {} as T, e ]);
	}
}

export function paginate( page: string = "1", per_page: string = "20" ): Pagination {
	if (isNaN(+page) || isNaN(+per_page)) {
		throw new Error("parâmetros de paginação incorretos. ambos devem ser strings numéricas")
	}

	return {
		page,
		per_page
	}
}

export const usersApi = new Requester("http://host.docker.internal:8080/users")