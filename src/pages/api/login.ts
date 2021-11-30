import { NextApiRequest, NextApiResponse } from "next";
import { ApiLoginRequest } from "@/data/usecases/login-request";

const loginHandler = new ApiLoginRequest()

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
	return loginHandler.handle(req, res)
}

