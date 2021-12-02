import { NextApiRequest, NextApiResponse } from "next";
import { makeApiRecoverAccount } from "@/data/factories/recover-account-factory";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
	return makeApiRecoverAccount().handle(req, res)
}