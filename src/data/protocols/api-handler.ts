import { NextApiRequest, NextApiResponse } from "next";
import { LocalResponse } from "@/data/protocols/local-response";

export interface ApiHandler {
	handle<T = any>( req: NextApiRequest, res: NextApiResponse<LocalResponse<T>> ): Promise<void>
}