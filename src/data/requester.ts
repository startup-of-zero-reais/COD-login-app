import { HeadersInit } from "next/dist/server/web/spec-compliant/headers";

type DoubleResponse<T> = [ T, (Error | null) ];
type Pagination = {
	page: string,
	per_page: string
}

class Requester {
	private readonly baseURL: string = ""
	private readonly XApiKey: string = ""
	private readonly application: string = ""

	constructor( baseURL = "" ) {
		this.baseURL = baseURL
		this.XApiKey = process.env.X_API_KEY || ""
		this.application = process.env.APPLICATION || ""
	}

	async get<T = any>( path: string, pagination: Pagination ): Promise<DoubleResponse<T>> {
		const url = this.makeURL(path, pagination)
		return await fetch(url.toString(), this.getHeaders())
			.then(r => r.json())
			.then(json => [ json, null ] as DoubleResponse<T>)
			.catch(( e: Error | null ) => [ {} as T, e ]);
	}

	async post<T = any>(path: string, data: string | FormData): Promise<DoubleResponse<T>>{
		const url = this.makeURL(path)
		return await fetch(url.toString(), {
			...this.getHeaders(),
			method: "POST",
			body: data
		})
			.then(r => r.json())
			.then(json => [json , null] as DoubleResponse<T>)
			.catch(e => [{} as T, e])

	}

	private getHeaders(additionalHeaders?: HeadersInit): { headers:HeadersInit } {
		return {
			headers: {
				"x-api-key": this.XApiKey,
				"application": this.application,
				"Accept": "application/json",
				"Content-Type": "application/json",
				...(additionalHeaders || {})
			}
		}
	}

	private makeURL( path: string, pagination?: Pagination ): URL {
		const params = new URLSearchParams(pagination)
		return new URL(path + "?" + params.toString(), this.baseURL)
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

const usersBaseURL = process.env.USERS_API_BASE || "http://localhost:8080"
const localBaseURL = process.env.LOCAL_API_BASE || "http://localhost:3000/api"

export const usersApi = new Requester(usersBaseURL)
export const localApi = new Requester(localBaseURL)