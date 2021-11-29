import { NextApiRequest, NextApiResponse } from "next";
import { LocalLoginRequest } from "@/data/usecases/login-request";

const loginHandler = new LocalLoginRequest()

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
	return loginHandler.handle(req, res)
}

