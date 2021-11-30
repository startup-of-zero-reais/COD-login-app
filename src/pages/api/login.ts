import { NextApiRequest, NextApiResponse } from "next";
import { makeApiLoginRequest } from "@/data/factories/login-factory";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
	return makeApiLoginRequest().handle(req, res)
}

